package com.example.demo.services;

import com.example.demo.model.Employee;
import com.example.demo.model.Notification;
import com.example.demo.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public void sendNotification(Notification notification) {
        // Implement your notification sending logic here (e.g., email, SMS, etc.)
        System.out.println("Sending notification: " + notification.getTitle());
        System.out.println("Recipients: " + notification.getRecipients());
        // Replace with actual notification implementation based on your application's design
    }

    @Transactional
    public void markNotificationAsSeen(Long notificationId, Employee recipient) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found with id: " + notificationId));

        if (notification.getRecipients().contains(recipient)) {
            if (!notification.getSeenBy().containsKey(recipient)) {
                notification.markAsSeen(recipient);
                notificationRepository.save(notification);
            }
        } else {
            throw new IllegalArgumentException("Employee is not a recipient of this notification");
        }
    }

    @Transactional
    public void removeNotification(Long notificationId, Employee recipient) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found with id: " + notificationId));

        if (notification.getRecipients().contains(recipient)) {
            notificationRepository.delete(notification);
        } else {
            throw new IllegalArgumentException("Employee is not a recipient of this notification");
        }
    }
}
