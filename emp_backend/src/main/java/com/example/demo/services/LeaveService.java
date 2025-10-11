package com.example.demo.services;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.*;
import com.example.demo.repository.LeaveRepository;
import com.example.demo.repository.NotificationSeenByRepository;
import com.example.demo.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaveService {
    private final LeaveRepository leaveRepository;
    private final TaskRepository taskRepository;
    private final NotificationService notificationService;
    private final EmployeeService employeeService;
    private final NotificationSeenByRepository notificationSeenByRepository;

    @Transactional
    public Leave create(Leave leave){
        Employee employee = this.employeeService.findById(leave.getEmployee().getId());
        leave.setEmployee(employee);
        return this.leaveRepository.save(leave);
    }

    public List<Leave> fetchAll(){
        return this.leaveRepository.findAll();
    }

    public Leave findById(Long id){
        return leaveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave with id " + id + " does not exist"));
    }

    @Transactional
    public Leave updateById(Long id, Leave leave){
        Leave leaveDb = leaveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave with id " + id + " does not exist"));

        if(leave.getDescription() != null && !leave.getDescription().isEmpty())
            leaveDb.setDescription(leave.getDescription());

        if(leave.getEmployee() != null)
            leaveDb.setEmployee(leave.getEmployee());

        if(leave.getStartDate() != null && !leave.getStartDate().toString().isEmpty())
            leaveDb.setStartDate(leave.getStartDate());

        if(leave.getEndDate() != null && !leave.getEndDate().toString().isEmpty())
            leaveDb.setEndDate(leave.getEndDate());

        if(leave.getStatus() != null && !leave.getStatus().isEmpty()) {
            String oldStatus = leaveDb.getStatus();
            leaveDb.setStatus(leave.getStatus());

            // If leave status is accepted, update related tasks and notify employees
            if (leave.getStatus().equalsIgnoreCase("Approved") && !oldStatus.equalsIgnoreCase("accepted")) {
                handleAcceptedLeave(leaveDb);
            }
        }

        return this.leaveRepository.save(leaveDb);
    }

    public Boolean delete(Long id){
        Leave leave = leaveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave with id " + id + " does not exist"));

        leaveRepository.delete(leave);

        return Boolean.TRUE;
    }

    @Transactional
    protected void handleAcceptedLeave(Leave leave) {
        // Fetch all tasks assigned to the employee of the leave
        Task task = taskRepository.findByEmployeeId(leave.getEmployee().getId())
                .orElseThrow(
                        () -> new ResourceNotFoundException("Could not retrieve task")
                );

        task.setStatus("pending");

        // Notify other employees on the same project
        notifyEmployeesOnSameProject(leave, task);
    }

    // Implement notification mechanism based on your application design
    private void notifyEmployeesOnSameProject(Leave leave, Task task) {
        // Retrieve all tasks assigned to employees on the same project as the leave-taking employee
        List<Task> tasks = taskRepository.findByProjectIdAndEmployeeIdNot(task.getProject().getId(), leave.getEmployee().getId());
        List<NotificationSeenBy> notificationSeenByList = new ArrayList<>();
        // Collect employees from these tasks
        List<Employee> recipients = tasks.stream()
                .map(Task::getEmployee)
                .distinct() // Ensure each employee receives only one notification
                .toList();

        // Create a notification
        String title = "Leave Accepted";
        String description = String.format(
                "Leave has been accepted for employee: %s %s From: %s To: %s",
                leave.getEmployee().getFirstname(),
                leave.getEmployee().getLastname(),
                leave.getStartDate(),
                leave.getEndDate()
        );


        Notification notf = Notification.builder()
                .title(title)
                .description(description)
                .recipients(recipients)
                .build();

        for(Employee recipient : recipients){
            notificationSeenByList.add(
                    NotificationSeenBy.builder()
                            .isSeen(Boolean.FALSE)
                            .employee(recipient)
                            .notification(notf)
                            .build()
            );

        }

        // Send the notification
        // Save and send the notification
        notificationService.createNotification(notf, notificationSeenByList);
        notificationService.sendNotification(notf);
    }

    // Method to get number of leaves taken by the employee
    public int getNumberOfLeaves(long employeeId) {
        List<Leave> leaves = leaveRepository.findByEmployeeId(employeeId);
        List<Leave> approvedLeaves = leaves.stream()
                .filter(leave -> "Approved".equals(leave.getStatus()))
                .toList();
        return approvedLeaves.size();
    }

    // Method to calculate average days per leave taken by the employee
    public double getAverageDaysPerLeave(long employeeId) {
        List<Leave> leaves = leaveRepository.findByEmployeeId(employeeId);
        if (leaves.isEmpty()) {
            return 0.0;
        }
        double totalDays = leaves.stream()
                .mapToLong(leave -> ChronoUnit.DAYS.between(leave.getStartDate(), leave.getEndDate()))
                .sum();
        return totalDays / leaves.size();
    }

}
