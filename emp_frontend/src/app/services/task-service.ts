import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8081/api/v1/task'; // Adjust the base URL to match your backend configuration

  constructor(private http: HttpClient) { }

  createTask(task: Task): Observable<Task> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Task>(`${this.apiUrl}/create`, task, httpOptions);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/`);
  }

  getTaskById(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Task>(url, task, httpOptions);
  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  // Fetch Tasks by Employee ID
  getTasksByEmployeeId(employeeId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/employee/${employeeId}`);
  }
}
