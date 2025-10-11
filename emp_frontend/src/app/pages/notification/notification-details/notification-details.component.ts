import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notification } from '../../../models/notification';
import {NotificationService} from "../../../services/notification-service";

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnInit {
  notification: Notification = new Notification();

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadNotificationDetails();
  }

  loadNotificationDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.notificationService.getNotificationById(id).subscribe(
      (data: Notification) => this.notification = data,
      error => console.error('Error fetching notification details', error)
    );
  }
}
