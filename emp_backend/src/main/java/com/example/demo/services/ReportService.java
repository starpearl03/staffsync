package com.example.demo.services;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Employee;
import com.example.demo.model.Leave;
import com.example.demo.model.Report;
import com.example.demo.model.Task;
import com.example.demo.repository.ReportRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.requestResponse.ExportReportRequest;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final TaskRepository taskRepository;
    private final LeaveService leaveService;

    @Transactional
    public Report generateReportForEmployee(long employeeId) {
        Task task = taskRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Could not retrieve task"));

        // Check if a report already exists for the given employee and project
        Optional<Report> existingReportOpt = reportRepository.findByEmployeeIdAndProjectId(employeeId, task.getProject().getId());

        Report report;
        if (existingReportOpt.isPresent()) {
            report = existingReportOpt.get();
            // Update non-null values
            if (task.getEmployee() != null) {
                report.setEmployee(task.getEmployee());
            }
            if (task.getProject() != null) {
                report.setProject(task.getProject());
            }
            report.setTotalHoursWorked(task.calculateHoursWorked());
            report.setAveragePerformance(task.calculatePerformance().ratio());
            report.setPerformanceMeasure(task.calculatePerformance().measure());
            report.setCompletionTimeVariance(task.calculateCompletionTimeVariance());
            report.setEfficiency(task.calculateEfficiency());
            report.setNumberOfLeaves(leaveService.getNumberOfLeaves(employeeId));
            report.setAverageDaysPerLeave(leaveService.getAverageDaysPerLeave(employeeId));
            report.setTaskLengthInHours(task.getDurationInHours());
        } else {
            // Create a new report if it doesn't exist
            report = Report.builder()
                    .employee(task.getEmployee())
                    .project(task.getProject())
                    .totalHoursWorked(task.calculateHoursWorked())
                    .averagePerformance(task.calculatePerformance().ratio())
                    .performanceMeasure(task.calculatePerformance().measure())
                    .completionTimeVariance(task.calculateCompletionTimeVariance())
                    .efficiency(task.calculateEfficiency())
                    .numberOfLeaves(leaveService.getNumberOfLeaves(employeeId))
                    .averageDaysPerLeave(leaveService.getAverageDaysPerLeave(employeeId))
                    .taskLengthInHours(task.getDurationInHours())
                    .build();
        }

        return reportRepository.save(report);
    }

    public List<Report> fetchAll() {
        return reportRepository.findAll();
    }

    public Report findById(Long id) {
        return reportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report with id " + id + " does not exist"));
    }

    public Report updateById(Long id, Report report) {
        Report reportDb = reportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report with id " + id + " does not exist"));

        if (report.getProject() != null)
            reportDb.setProject(report.getProject());

        return reportRepository.save(reportDb);
    }

    public Boolean delete(Long id) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report with id " + id + " does not exist"));

        reportRepository.delete(report);

        return Boolean.TRUE;
    }

    // Method to calculate total hours worked
    public double calculateTotalHoursWorked(Task task) {
        return  ChronoUnit.HOURS.between(task.getAssignedDate(), task.getFinishedDate());
    }

    // Method to calculate average hours per task
    public double calculateAverageHoursPerTask(Task task) {
        if (task.toString().isEmpty()) {
            return 0.0;
        }

        double totalHours = calculateTotalHoursWorked(task);
        return totalHours / task.getDurationInHours();
    }

    // Method to calculate number of leaves taken
    public int calculateNumberOfLeaves(List<Leave> leaves) {
        return leaves.size();
    }

    // Method to calculate average days per leave
    public double calculateAverageDaysPerLeave(List<Leave> leaves) {
        if (leaves.isEmpty()) {
            return 0.0;
        }

        double totalDays = leaves.stream()
                .mapToLong(leave -> ChronoUnit.DAYS.between(leave.getStartDate(), leave.getEndDate()))
                .sum();
        return totalDays / leaves.size();
    }


    public String exportReportAsCSV(Long employeeId) throws IOException {
        Task task = this.taskRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Could not retrieve task"));
        List<Leave> leaves = this.leaveService.fetchAll(); // Fetch all leaves

        // Create ExportReportRequest object
        ExportReportRequest request = new ExportReportRequest(
                task.getEmployee().getFirstname() + "_" + task.getEmployee().getLastname()+ "_" + "report" + ".csv"
        );

        // Calculate performance metrics
        long totalHoursWorked = task.calculateHoursWorked();
        Task.PerformanceRecord performanceRecord = task.calculatePerformance();
        double averagePerformance = performanceRecord.ratio();
        Task.PerformanceMeasure performanceMeasure = performanceRecord.measure();
        long completionTimeVariance = task.calculateCompletionTimeVariance();
        boolean isTaskOnTime = task.isTaskOnTime();
        double efficiency = task.calculateEfficiency();

        // Specify the directory path
        String userHome = System.getProperty("user.home");
        String documentsPath = Paths.get(userHome, "Documents").toString();
        String filePath = Paths.get(documentsPath, request.getFilePath()).toString();

        // Create the file object
        File file = new File(filePath);

        // Check if the parent directory exists, if not, create it
        File parentDir = file.getParentFile();
        if (!parentDir.exists()) {
            parentDir.mkdirs();
        }

        // Write to the CSV file
        try (FileWriter writer = new FileWriter(file)) {
            // Write header for main report data
            writer.append("Employee Report\n");

            // Write data rows
            writer.append("Project Title,Employee Name,Task Title,Duration in Hours\n");
            writer.append(escapeSpecialCharacters(task.getProject().getTitle())).append(",");
            writer.append(formatEmployeeName(task.getEmployee())).append(",");
            writer.append(escapeSpecialCharacters(task.getTitle())).append(",");
            writer.append(String.valueOf(task.getDurationInHours())).append("\n\n");

            // Write performance analytics
            writer.append("Performance Analytics\n");
            writer.append("Task Completion Status,").append(isTaskOnTime ? "On Time" : "Delayed").append(",").append("Indicates whether the task was completed on time or delayed.\n");
            writer.append("Completion Time Variance,").append(String.valueOf(completionTimeVariance)).append(" hours,").append("Measures the deviation from the planned completion time.\n");
            writer.append("Total Hours Worked,").append(String.valueOf(totalHoursWorked)).append(" hours,").append("Total hours spent by the employee on the task.\n");
            writer.append("Average Performance,").append(String.valueOf(averagePerformance)).append(",").append("Ratio of actual hours worked to planned duration.\n");
            writer.append("Performance Category,").append(performanceMeasure.toString()).append(",").append("Categorizes performance as Excellent, Good, Average, or Poor.\n");
            writer.append("Efficiency,").append(String.valueOf(efficiency)).append(",").append("Measures the efficiency of time utilization.\n");

            writer.append("\n");

            // Write leaves data
            writer.append("Leaves Data\n");
            writer.append("Number of Leaves:,").append(String.valueOf(calculateNumberOfLeaves(leaves))).append("\n");
            writer.append("Average Days per Leave:,").append(String.valueOf(calculateAverageDaysPerLeave(leaves))).append("\n\n");


        } catch (IOException e) {
            throw new IOException("Error writing to file: " + filePath, e);
        }

        return filePath;
    }

    // Helper method to format employee name
    private String formatEmployeeName(Employee employee) {
        return employee.getFirstname() + " " + employee.getLastname();
    }

    // Helper method to escape special characters in CSV
    private String escapeSpecialCharacters(String data) {
        if (data == null) {
            return "";
        }
        return data.replace(",", ";"); // Example of replacing comma with semicolon
    }


    // Method to export report as PDF
    public String exportReportAsPDF(Long employeeId) throws IOException, DocumentException {
        Task task = this.taskRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Could not retrieve task"));
        List<Leave> leaves = this.leaveService.fetchAll(); // Fetch all leaves

        // Calculate performance metrics
        long totalHoursWorked = task.calculateHoursWorked();
        Task.PerformanceRecord performanceRecord = task.calculatePerformance();
        double averagePerformance = performanceRecord.ratio();
        Task.PerformanceMeasure performanceMeasure = performanceRecord.measure();
        long completionTimeVariance = task.calculateCompletionTimeVariance();
        boolean isTaskOnTime = task.isTaskOnTime();
        double efficiency = task.calculateEfficiency();

        // Manually create ExportReportRequest for PDF
        ExportReportRequest request = new ExportReportRequest(
                task.getEmployee().getFirstname() + "_" + task.getEmployee().getLastname() + "_report.pdf"
        );

        // Specify the directory path for Documents
        String userHome = System.getProperty("user.home");
        String documentsPath = Paths.get(userHome, "Documents").toString();
        String filePath = Paths.get(documentsPath, request.getFilePath()).toString();

        // Create PDF document and write content
        Document document = new Document();
        PdfWriter.getInstance(document, new FileOutputStream(filePath));
        document.open();

        // Define fonts
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.BLACK);
        Font headingFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, BaseColor.DARK_GRAY);
        Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);

        // Write main report data
        Paragraph title = new Paragraph("Employee Report", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);
        document.add(Chunk.NEWLINE);

        document.add(createSection("Project Title", task.getProject().getTitle(), normalFont));
        document.add(createSection("Employee Name", formatEmployeeName(task.getEmployee()), normalFont));
        document.add(createSection("Task Title", task.getTitle(), normalFont));
        document.add(createSection("Task length (hours)", String.valueOf(task.getDurationInHours()), normalFont));

        document.add(new Paragraph("--------------------------------------------", normalFont));
        document.add(Chunk.NEWLINE);

        // Write performance analytics
        Paragraph performanceHeading = new Paragraph("Performance Analytics", headingFont);
        document.add(performanceHeading);
        document.add(Chunk.NEWLINE);

        document.add(createSection("Task Completion Status", isTaskOnTime ? "On Time" : "Delayed", normalFont));
        document.add(createSection("Completion Time Variance", completionTimeVariance + " hours", normalFont));
        document.add(createSection("Total Hours Worked", totalHoursWorked + " hours", normalFont));
        document.add(createSection("Average Performance", String.valueOf(averagePerformance), normalFont));
        document.add(createSection("Performance Category", performanceMeasure.toString(), normalFont));
        document.add(createSection("Efficiency", String.valueOf(efficiency), normalFont));

        document.add(new Paragraph("--------------------------------------------", normalFont));
        document.add(Chunk.NEWLINE);

        // Write leaves data
        Paragraph leavesHeading = new Paragraph("Leaves Data", headingFont);
        document.add(leavesHeading);
        document.add(Chunk.NEWLINE);

        document.add(createSection("Number of Leaves", String.valueOf(calculateNumberOfLeaves(leaves)), normalFont));
        document.add(createSection("Average Days per Leave", String.valueOf(calculateAverageDaysPerLeave(leaves)), normalFont));

        document.close();

        return filePath;
    }

    // Helper method to create a section with a heading and content
    private Paragraph createSection(String heading, String content, Font font) {
        Paragraph section = new Paragraph();
        section.add(new Chunk(heading + ": ", font));
        section.add(new Chunk(content, FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK)));
        section.setAlignment(Element.ALIGN_LEFT);
        section.setIndentationLeft(20);
        return section;
    }

}
