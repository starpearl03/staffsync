import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'api/notifications';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getNotifications(query: string): Observable<Notification[]> {
    const url = `${this.apiUrl}?search=${query}`;
    return this.http.get<Notification[]>(url);
  }

  getNotificationById(id: number): Observable<Notification> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Notification>(url);
  }

  markNotificationAsRead(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}/markAsRead`;
    return this.http.post<void>(url, {});
  }
}
