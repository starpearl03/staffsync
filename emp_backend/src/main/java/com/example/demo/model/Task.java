package com.example.demo.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "tasks")
@JsonSerialize(as = Task.class)
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String description;
    private Integer durationInHours;
    private LocalDate assignedDate;
    private LocalDate finishedDate;
    private LocalDate deadlineDate;
    private String status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id")
    private Project project;

    // PerformanceMeasure Enum
    public enum PerformanceMeasure {
        EXCELLENT, GOOD, MEDIUM, POOR
    }

    /**
     * Method to calculate hours worked on the task.
     * @return the number of hours between assignedDate and finishedDate.
     */
    public long calculateHoursWorked() {
        if (assignedDate == null || finishedDate == null) {
            return 0;
        }
        LocalDateTime start = assignedDate.atStartOfDay();
        LocalDateTime end = finishedDate.atStartOfDay();
        return ChronoUnit.HOURS.between(start, end);
    }

    /**
     * Method to calculate performance metric (completion ratio).
     * @return a record containing the performance ratio and its qualitative measure.
     */
    public PerformanceRecord calculatePerformance() {
        long hoursWorked = calculateHoursWorked();
        if (durationInHours == null || durationInHours == 0 || hoursWorked == 0) {
            return new PerformanceRecord(0.0, PerformanceMeasure.POOR);
        }
        double ratio = (double) hoursWorked / durationInHours;
        PerformanceMeasure measure;

        if (ratio >= 1.2) {
            measure = PerformanceMeasure.EXCELLENT;
        } else if (ratio >= 1.0) {
            measure = PerformanceMeasure.GOOD;
        } else if (ratio >= 0.8) {
            measure = PerformanceMeasure.MEDIUM;
        } else {
            measure = PerformanceMeasure.POOR;
        }

        return new PerformanceRecord(ratio, measure);
    }

    /**
     * Method to calculate completion time variance.
     * @return the difference between actual hours worked and planned duration in hours.
     */
    public long calculateCompletionTimeVariance() {
        if (durationInHours == null || durationInHours == 0) {
            return 0;
        }
        return calculateHoursWorked() - durationInHours;
    }

    /**
     * Method to check if the task was completed on time.
     * @return true if finishedDate is on or before deadlineDate, false otherwise.
     */
    public boolean isTaskOnTime() {
        if (finishedDate == null || deadlineDate == null) {
            return false;
        }
        return !finishedDate.isAfter(deadlineDate);
    }

    /**
     * Method to calculate efficiency of task completion.
     * @return the efficiency ratio based on actual hours worked and planned duration in hours.
     */
    public double calculateEfficiency() {
        long hoursWorked = calculateHoursWorked();
        if (durationInHours == null || durationInHours == 0 || hoursWorked == 0) {
            return 0.0;
        }
        return (double) durationInHours / hoursWorked;
    }

    // Record for holding performance metrics
    public record PerformanceRecord(double ratio, PerformanceMeasure measure) {}
}
