package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String description;
    private Integer durationInHours;
    private LocalDate assignedDate;
    private LocalDate finishedDate;
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    // Method to calculate hours worked on the task
    public long calculateHoursWorked() {
        if (assignedDate == null || finishedDate == null) {
            return 0;
        }
        return ChronoUnit.HOURS.between(assignedDate.atStartOfDay(), finishedDate.atStartOfDay());
    }

    // Method to calculate performance metric (completion ratio)
    public double calculatePerformance() {
        if (durationInHours == 0) {
            return 0.0;
        }
        return (double) calculateHoursWorked() / durationInHours;
    }
}
