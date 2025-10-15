import { Component, HostListener, OnInit } from '@angular/core';
import { NotificationService } from "../../services/notification-service";
import { Notification } from "../../models/notification";
import {EmployeeService} from "../../services/employee.service";
import {AuthService} from "../../services/auth-services.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  isDropdownOpen = false;
  notifications: Notification[] = [];
  unreadCount = 0;
  employeeId?: number;

  constructor(
    private notificationService: NotificationService,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe(user => {
      if (user) {
        this.employeeService.getEmployeesList().subscribe(employees => {
          const employee = employees.find(e => e.email === user.email);
          if (employee) {
            this.employeeId = employee.id;
            this.loadNotifications();
          } else {
            console.error('Employee not found');
          }
        });
      } else {
        console.error('Logged user not found');
      }
    });
  }

  // Method to toggle the dropdown
  toggleDropdown(event: Event): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    event.stopPropagation(); // Prevent the click event from propagating
  }

  // Listen for clicks outside the dropdown to close it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  loadNotifications(): void {
    if (this.employeeId !== undefined) {
      this.notificationService.getNotifications(this.employeeId).subscribe(
        data => {
          this.notifications = data.map(notificationData => {
            const notification = new Notification();
            Object.assign(notification, notificationData);
            return notification;
          });
          this.updateUnreadCount();
        },
        error => console.error('Error fetching notifications', error)
      );
    } else {
      console.error('Employee ID is not defined');
    }
  }

  isNotificationNew(notification: Notification): boolean {
    return this.employeeId !== undefined && !notification.isSeen(this.employeeId);
  }

  updateUnreadCount(): void {
    if (this.employeeId !== undefined) {
      this.unreadCount = this.notifications.filter(notification => {
        // Ensure employeeId is treated as a number
        return this.employeeId !== undefined && !notification.isSeen(this.employeeId);
      }).length;
    } else {
      // Handle the case where employeeId is undefined
      console.error('Employee ID is not defined');
      this.unreadCount = 0; // Set unreadCount to 0 or handle as needed
    }
  }


  hasUnreadNotifications(): boolean {
    return this.unreadCount > 0;
  }
}
