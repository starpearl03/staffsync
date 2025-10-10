import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../../services/notification-service";
import {Notification} from "../../../models/notification";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[] = [];
  searchQuery: string = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications(this.searchQuery).subscribe(
      (data: Notification[]) => this.notifications = data,
      error => console.error('Error fetching notifications', error)
    );
  }

  searchNotifications(): void {
    this.loadNotifications();
  }

  viewNotificationDetails(id: number): void {
    // Navigate to notification details page
  }

  markAsRead(id: number): void {
    this.notificationService.markNotificationAsRead(id).subscribe(
      () => this.loadNotifications(),
      error => console.error('Error marking notification as read', error)
    );
  }
}
