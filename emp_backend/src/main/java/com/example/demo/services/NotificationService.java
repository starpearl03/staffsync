package com.example.demo.services;

import com.example.demo.model.Employee;
import com.example.demo.model.Notification;
import com.example.demo.model.NotificationSeenBy;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.NotificationRepository;
import com.example.demo.repository.NotificationSeenByRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final EmployeeService employeeService;
    private final NotificationSeenByRepository notificationSeenByRepository;

    public Notification createNotification(Notification notification,List<NotificationSeenBy> nsbs) {

        Notification newNotification = Notification.builder()
                .title(notification.getTitle())
                .description(notification.getDescription())
                .recipients(new ArrayList<>(notification.getRecipients()))
                .build();
        Notification saved = notificationRepository.save(newNotification);

        for (NotificationSeenBy nsb : nsbs){
            nsb.setNotification(saved);
            this.notificationSeenByRepository.save(nsb);
        }

        return saved;
    }

    public void sendNotification(Notification notification) {
        // Implement your notification sending logic here (e.g., email, SMS, etc.)
        System.out.println("Sending notification: " + notification.getTitle());
        System.out.println("Recipients: " + notification.getRecipients());
        // Replace with actual notification implementation based on your application's design
    }

    // Get all notifications unseen for the user
    public List<Notification> fetchAll(Long employeeId) {
        List<Notification> notificationList = new ArrayList<>();
        List<Notification> notifications = notificationRepository.findAll();
        List<NotificationSeenBy> notificationSeenByList = notificationSeenByRepository.findAll();
        Employee recipient = employeeService.findById(employeeId);

        for (Notification notification : notifications) {
            // Check if the recipient is included in the notification's recipients
            if (notification.getRecipients().contains(recipient)) {
                boolean seenByEmployee = false;

                // Check if the notification has been seen by the specific employee
                for (NotificationSeenBy nsb : notificationSeenByList) {
                    if (nsb.getNotification().equals(notification) && nsb.getEmployee().equals(recipient)) {
                        seenByEmployee = nsb.getIsSeen();
                        break;
                    }
                }

                // Create a simplified version of the notification without all recipients
                Notification simplifiedNotification = new Notification();
                simplifiedNotification.setId(notification.getId());
                simplifiedNotification.setTitle(notification.getTitle());
                simplifiedNotification.setDescription(notification.getDescription());

                // Create a simplified list of seen status for the specific employee
                NotificationSeenBy simplifiedSeenBy = new NotificationSeenBy();
                simplifiedSeenBy.setEmployee(recipient);
                simplifiedSeenBy.setIsSeen(seenByEmployee);

                List<NotificationSeenBy> simplifiedSeenByList = new ArrayList<>();
                simplifiedSeenByList.add(simplifiedSeenBy);

                simplifiedNotification.setSeenBy(simplifiedSeenByList);

                // Add the simplified notification to the list if it hasn't been added already
                if (!notificationList.contains(simplifiedNotification)) {
                    notificationList.add(simplifiedNotification);
                }
            }
        }

        return notificationList;
    }



    @Transactional
    public Boolean markNotificationAsSeen(Long notificationId, Long employeeId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found with id: " + notificationId));
        List<NotificationSeenBy> notificationSeenByList = this.notificationSeenByRepository.findAll();
        Employee recipient = this.employeeService.findById(employeeId);

        if (notification.getRecipients().contains(recipient)) {
            for(NotificationSeenBy nbs: notificationSeenByList){
                if(nbs.getNotification().equals(notification)){
                    nbs.setIsSeen(Boolean.TRUE);
                    notification.markAsSeen(recipient);
                    notificationRepository.save(notification);
                    notificationSeenByRepository.save(nbs);
                    return Boolean.TRUE;
                }
            }
        } else {
            throw new IllegalArgumentException("Employee is not a recipient of this notification");
        }
        return Boolean.FALSE;

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

    public List<Notification> fetchAllN() {
        return this.notificationRepository.findAll();
    }
}
