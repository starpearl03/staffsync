package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "notification_recipients",
            joinColumns = @JoinColumn(name = "notification_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private List<Employee> recipients = new ArrayList<>();

    @OneToMany(mappedBy = "notification")
    @JsonManagedReference
    private List<NotificationSeenBy> seenBy = new ArrayList<>();

    public void markAsSeen(Employee employee) {
        NotificationSeenBy seenByEntry = NotificationSeenBy.builder()
                .isSeen(Boolean.TRUE)
                .notification(this)
                .employee(employee)
                .build();
        this.seenBy.add(seenByEntry);
    }

    public boolean isSeenBy(Employee employee) {
        return seenBy.stream()
                .anyMatch(entry -> entry.getEmployee()
                        .equals(employee) && entry.getIsSeen()
                );
    }
}
