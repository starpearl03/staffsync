import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../models/notification';
import { NotificationService } from "../../../services/notification-service";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth-services.service";
import { delay, of } from "rxjs";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[] = [];
  searchQuery: string = '';
  employeeId?: number;
  isLoading = false;
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type
  isAdmin = false; // Track if the logged-in user is an admin

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchEmployeeIdAndLoadNotifications();
    this.delay();
  }

  fetchEmployeeIdAndLoadNotifications(): void {
    this.authService.getLoggedInUser().subscribe(user => {
      if (user) {
        this.isAdmin = user.role === 'ADMIN'; // Check if user is an admin
        if (this.isAdmin) {
          this.loadAllNotifications();
        } else {
          this.authService.getLoggedInEmployee().subscribe(employee => {
            if (employee) {
              this.employeeId = employee.id; // Directly use the employee ID from the response
              this.loadNotifications();
            } else {
              console.error('Employee not found');
              this.delay();
            }
          });
        }
      } else {
        console.error('User not found');
      }
    });
  }

  loadNotifications(): void {
    if (this.employeeId !== undefined) {
      this.notificationService.getNotifications(this.employeeId, this.searchQuery).subscribe(
        (data: any[]) => {
          this.notifications = data.map(notificationData => {
            const notification = new Notification();
            Object.assign(notification, notificationData);
            return notification;
          });

          console.log(this.notifications[0]?.description); // Check if the description format is correct
          console.log(this.notifications[0]?.getFormattedDescription()); // Check if formatting is applied correctly
        },
        error => {
          console.error('Error fetching notifications', error);
        }
      );
    } else {
      console.error('Employee ID is not defined');
    }
  }

  loadAllNotifications(): void {
    this.notificationService.getAllNotifications(this.searchQuery).subscribe(
      (data: any[]) => {
        this.notifications = data.map(notificationData => {
          const notification = new Notification();
          Object.assign(notification, notificationData);
          return notification;
        });

        console.log(this.notifications[0]?.description); // Check if the description format is correct
        console.log(this.notifications[0]?.getFormattedDescription()); // Check if formatting is applied correctly
      },
      error => {
        console.error('Error fetching notifications', error);
      }
    );
  }

  searchNotifications(): void {
    this.isLoading = true;
    if (this.isAdmin) {
      this.loadAllNotifications();
    } else {
      this.loadNotifications();
    }
    this.delay();
  }

  viewNotificationDetails(id: number): void {
    this.router.navigate(['/notification', id]);
  }

  markAsRead(id: number): void {
    if (this.employeeId !== undefined) {
      this.notificationService.markNotificationAsRead(id, this.employeeId).subscribe(
        () => {
          this.alertMessage = "Notification marked as seen";
          this.alertType = "info";
          this.loadNotifications();

          of('Delayed action executed').pipe(
            delay(1000)
          ).subscribe(message => {
            window.location.reload();
          });
        },
        error => {
          console.error('Error marking notification as read', error);
          this.alertMessage = "Failed to mark notification as seen";
          this.alertType = "warning";
        }
      );
    } else {
      console.error('Employee ID is not defined');
    }
  }

  delay() {
    of('Delayed action executed').pipe(
      delay(1000)
    ).subscribe(message => {
      console.log(message);
      this.isLoading = false;
    });
  }

  // Helper methods to handle notification status
  getNotificationStatusClass(notification: Notification): string {
    return notification.isSeen(this.employeeId ?? 0) ? 'typcn typcn-tick seen-status' : 'typcn typcn-warning unseen-status';
  }

  getNotificationStatusText(notification: Notification): string {
    return notification.isSeen(this.employeeId ?? 0) ? 'Seen' : 'Unseen';
  }


}
