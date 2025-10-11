import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../models/notification';
import {NotificationService} from "../../../services/notification-service";
import {Router} from "@angular/router";
import {delay, of} from "rxjs";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[] = [];
  searchQuery: string = '';
  employeeId: number = 3; // Example employee ID, replace with actual ID
  isLoading = false;
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type
  constructor(private notificationService: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadNotifications();
    this.delay();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications(this.employeeId, this.searchQuery).subscribe(
      (data: any[]) => {
        // Transform plain objects to Notification instances
        this.notifications = data.map(notificationData => {
          const notification = new Notification();
          Object.assign(notification, notificationData);
          return notification;
        });

        console.log(this.notifications[0].isSeen(this.employeeId)); // Debugging output
        console.log(this.notifications[0].description); // Check if the description format is correct
        console.log(this.notifications[0].getFormattedDescription()); // Check if formatting is applied correctly
      },
      error => console.error('Error fetching notifications', error)
    );
  }

  searchNotifications(): void {
    this.loadNotifications();
  }

  // Will add functionality
  viewNotificationDetails(id: number): void {
    this.router.navigate(['/notification', id]);
  }

  markAsRead(id: number): void {
    this.notificationService.markNotificationAsRead(id, this.employeeId).subscribe(
      () => {
        this.alertMessage = "Notification marked as seen";
        this.alertType = "info"
        this.loadNotifications();
      },
      error => {
        console.error('Error marking notification as read', error);
        // Optionally, you can set an error message here:
        this.alertMessage = "Failed to mark notification as seen";
        this.alertType = "warning";
      }
    );
  }


  delay(){
    // Create an observable that emits a value after a 3-second delay
    of('Delayed action executed').pipe(
      delay(1000) // 3000 milliseconds = 3 seconds
    ).subscribe(message => {
      console.log(message);
      this.isLoading = false;
    });
  }

}
