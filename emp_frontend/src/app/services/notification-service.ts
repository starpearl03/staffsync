import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8081/api/v1/notification'; // Base URL for your backend API

  constructor(private http: HttpClient) {}

  // Fetch all notifications for a given employee
  getNotifications(employeeId: number, searchQuery: string = ''): Observable<Notification[]> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.get<Notification[]>(url, {
      params: {
        search: searchQuery
      }
    });
  }

  // Mark notification as read
  markNotificationAsRead(notificationId: number, employeeId: number): Observable<boolean> {
    const url = `${this.apiUrl}/markAsSeen/${notificationId}/${employeeId}`;
    return this.http.post<boolean>(url, {});
  }

  getNotificationById(id: number): Observable<Notification> {
    const url = `${this.apiUrl}/details/${id}`;
    return this.http.get<Notification>(url);
  }

  getAllNotifications(searchQuery: string = ''): Observable<Notification[]> {
    const url = `${this.apiUrl}/1`;
    return this.http.get<Notification[]>(url, {
    });
  }
}
