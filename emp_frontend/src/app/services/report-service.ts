import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'your-api-endpoint'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }

  generateReport(employeeId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reports/generate`, { employeeId });
  }

  downloadReport(id: number, format: 'pdf' | 'csv'): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/reports/${id}/download`, {
      responseType: 'blob',
      params: {
        format
      }
    });
  }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/reports`);
  }

  getReportById(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/reports/${id}`);
  }

  getReportDetails(reportId: number) {
    return this.http.get<Report>(`${this.apiUrl}/reports/${reportId}`);
  }
}
