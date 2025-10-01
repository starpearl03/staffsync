package com.example.demo.services;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Leave;
import com.example.demo.model.Report;
import com.example.demo.model.Task;
import com.example.demo.repository.ReportRepository;
import com.example.demo.repository.TaskRepository;
import com.itextpdf.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final TaskRepository taskRepository;
    private final LeaveService leaveService;

    @Transactional
    public Report generateReportForEmployee(long employeeId) {
        Task tasks = taskRepository.findByEmployeeId(employeeId);

        long totalHoursWorked = tasks.calculateHoursWorked();

        double averagePerformance = tasks.calculatePerformance();

        int numberOfLeaves = leaveService.getNumberOfLeaves(employeeId);

        double averageDaysPerLeave = leaveService.getAverageDaysPerLeave(employeeId);

        Report report = Report.builder()
                .totalHoursWorked(totalHoursWorked)
                .averagePerformance(averagePerformance)
                .numberOfLeaves(numberOfLeaves)
                .averageDaysPerLeave(averageDaysPerLeave)
                .build();

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

    // Method to export report as CSV
    public void exportReportAsCSV(String filePath, Long employeeId) throws IOException, IOException {
        Task task = this.taskRepository.findByEmployeeId(employeeId);
        List<Leave> leaves = this.leaveService.fetchAll(); // Fetch all leaves

        try (FileWriter writer = new FileWriter(filePath)) {
            // Write performance analytics
            writer.append("Performance Analytics\n");
            writer.append("Total Hours Worked:,").append(String.valueOf(calculateTotalHoursWorked(task))).append("\n");
            writer.append("Average Hours per Task:,").append(String.valueOf(calculateAverageHoursPerTask(task))).append("\n\n");

            // Write leaves data
            writer.append("Leaves Data\n");
            writer.append("Number of Leaves:,").append(String.valueOf(calculateNumberOfLeaves(leaves))).append("\n");
            writer.append("Average Days per Leave:,").append(String.valueOf(calculateAverageDaysPerLeave(leaves))).append("\n\n");

            // Write header for main report data
            writer.append("Project Name, Employee Name, Task Title, Duration in Hours\n");

            // Write data rows
            writer.append(task.getProject().getTitle()).append(",");
            writer.append(task.getEmployee().getEmail()).append(",");
            writer.append(task.getEmployee().getFirstname()).append(",");
            writer.append(task.getEmployee().getLastname()).append(",");
            writer.append(task.getTitle()).append(",");
            writer.append(String.valueOf(task.getDurationInHours())).append("\n");
        }
    }

    // Method to export report as PDF
    public void exportReportAsPDF(String filePath, Long employeeId) throws IOException, DocumentException {
        // Similar logic as CSV export, using iText or any other PDF library
        // Example: Use iText to create PDF
        // This example demonstrates basic PDF generation, adjust as per your actual data and layout needs
        Task task = this.taskRepository.findByEmployeeId(employeeId);
        List<Leave> leaves = this.leaveService.fetchAll(); // Fetch all leaves

        com.itextpdf.text.Document document = new com.itextpdf.text.Document();
        com.itextpdf.text.pdf.PdfWriter.getInstance(document, new FileOutputStream(filePath));
        document.open();

        // Write performance analytics
        document.add(new com.itextpdf.text.Paragraph("Performance Analytics"));
        document.add(new com.itextpdf.text.Paragraph("Total Hours Worked: " + calculateTotalHoursWorked(task)));
        document.add(new com.itextpdf.text.Paragraph("Average Hours per Task: " + calculateAverageHoursPerTask(task)));
        document.add(new com.itextpdf.text.Paragraph("\n"));

        // Write leaves data
        document.add(new com.itextpdf.text.Paragraph("Leaves Data"));
        document.add(new com.itextpdf.text.Paragraph("Number of Leaves: " + calculateNumberOfLeaves(leaves)));
        document.add(new com.itextpdf.text.Paragraph("Average Days per Leave: " + calculateAverageDaysPerLeave(leaves)));
        document.add(new com.itextpdf.text.Paragraph("\n"));

        // Write main report data
        document.add(new com.itextpdf.text.Paragraph("Project Name: " + task.getProject().getTitle()));
        document.add(new com.itextpdf.text.Paragraph("Employee Name: " + task.getEmployee().getEmail()));
        document.add(new com.itextpdf.text.Paragraph("Employee Name: " + task.getEmployee().getFirstname()));
        document.add(new com.itextpdf.text.Paragraph("Employee Name: " + task.getEmployee().getLastname()));
        document.add(new com.itextpdf.text.Paragraph("Task Title: " + task.getTitle()));
        document.add(new com.itextpdf.text.Paragraph("Duration in Hours: " + task.getDurationInHours()));
        document.add(new com.itextpdf.text.Paragraph("--------------------------------------------"));


        document.close();
    }
}
