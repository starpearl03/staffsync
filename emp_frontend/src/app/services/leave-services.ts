import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Leave} from "../models/leave";

@Injectable({
  providedIn: 'root'
})
export class LeaveServices {
  private apiUrl = 'http://your-backend-api-url/leaves'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Get all leaves
  getAllLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.apiUrl);
  }

  // Get leave by ID
  getLeaveById(id: number): Observable<Leave> {
    return this.http.get<Leave>(`${this.apiUrl}/${id}`);
  }

  // Create a new leave
  createLeave(leave: Leave): Observable<Leave> {
    return this.http.post<Leave>(this.apiUrl, leave);
  }

  // Update an existing leave
  updateLeave(leave: Leave): Observable<Leave> {
    return this.http.put<Leave>(`${this.apiUrl}/${leave.id}`, leave);
  }

  // Delete a leave
  deleteLeave(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
