import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leave } from '../models/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = 'http://localhost:8081/api/v1/leave'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  // Create Leave
  createLeave(leave: Leave): Observable<Leave> {
    return this.http.post<Leave>(`${this.apiUrl}/create`, leave);
  }

  // Fetch All Leaves
  getLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(`${this.apiUrl}/`);
  }

  // Fetch Leave by ID
  getLeaveById(id: number): Observable<Leave> {
    return this.http.get<Leave>(`${this.apiUrl}/${id}`);
  }

  // Update Leave
  updateLeave(id: number, leave: Leave): Observable<Leave> {
    return this.http.put<Leave>(`${this.apiUrl}/${id}`, leave);
  }

  // Delete Leave
  deleteLeave(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
