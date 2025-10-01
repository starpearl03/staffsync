package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

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
    private Set<Employee> recipients = new HashSet<>();

    @ElementCollection
    @CollectionTable(
            name = "notification_seen_by",
            joinColumns = @JoinColumn(name = "notification_id")
    )
    @MapKeyJoinColumn(name = "employee_id")
    @Column(name = "seen")
    private Map<Employee, Boolean> seenBy;

    public void markAsSeen(Employee employee) {
        seenBy.put(employee, true);
    }

    public boolean isSeenBy(Employee employee) {
        return seenBy != null && seenBy.containsKey(employee) && seenBy.get(employee);
    }
}
