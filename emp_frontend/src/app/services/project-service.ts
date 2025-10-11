import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8081/api/v1/project'; // Adjust the base URL to match your backend configuration

  constructor(private http: HttpClient) { }

  addProject(project: Project): Observable<Project> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log(`${this.apiUrl}/create`);
    return this.http.post<Project>(`${this.apiUrl}/create`, project, httpOptions);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/`);
  }

  getProjectById(id: number): Observable<Project> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Project>(url);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    const url = `${this.apiUrl}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Project>(url, project, httpOptions);
  }

  deleteProject(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
