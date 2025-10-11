package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @OneToOne
    @JoinColumn(name="employee_id")
    private Employee employee;

    private long totalHoursWorked;
    private double averagePerformance;
    private Task.PerformanceMeasure performanceMeasure;
    private long completionTimeVariance;
    private double efficiency;
    private int numberOfLeaves;
    private double averageDaysPerLeave;
    private Integer taskLengthInHours;
}
