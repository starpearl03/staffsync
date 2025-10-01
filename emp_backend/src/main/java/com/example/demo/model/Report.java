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

    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;

    private long totalHoursWorked;
    private double averagePerformance;
    private int numberOfLeaves;
    private double averageDaysPerLeave;
}
