import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:8081/api/v1/report'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  // Fetch all reports
  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/`);
  }

  // Fetch report by ID
  getReportById(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.baseUrl}/${id}`);
  }

  // Generate report for employee
  generateReport(employeeId: number): Observable<Report> {
    return this.http.post<Report>(`${this.baseUrl}/generate/${employeeId}`, {});
  }

// Export report as CSV
  exportReportAsCsv(employeeId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/exportToCsv/${employeeId}`, {}, {
      responseType: 'text' as 'json' // Expect plain text response
    });
  }

// Export report as PDF
  exportReportAsPdf(employeeId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/exportToPdf/${employeeId}`, {}, {
      responseType: 'text' as 'json' // Expect plain text response
    });
  }


  // Delete report by ID
  deleteReport(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
