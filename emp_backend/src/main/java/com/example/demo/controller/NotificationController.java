package com.example.demo.controller;

import com.example.demo.model.Notification;
import com.example.demo.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notification")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    // Get all notification for user
    @GetMapping("/{employeeId}")
    public ResponseEntity<List<Notification>> fetchAll(@PathVariable Long employeeId){
        return ResponseEntity.ok()
                .body(
                        this.notificationService.fetchAll(employeeId)
                );
    }

    // Mark as read
    @PostMapping("/markAsSeen/{notificationId}/{employeeId}")
    public ResponseEntity<Boolean> markNotificationAsSeen(
            @PathVariable Long notificationId, @PathVariable Long employeeId){

        return ResponseEntity.ok().body(
                this.notificationService.markNotificationAsSeen(
                        notificationId,
                        employeeId
                )
        );

    }

    // Get all notification for user
    @GetMapping("/")
    public ResponseEntity<List<Notification>> fetchAllN(){
        return ResponseEntity.ok()
                .body(
                        this.notificationService.fetchAllN()
                );
    }
}
