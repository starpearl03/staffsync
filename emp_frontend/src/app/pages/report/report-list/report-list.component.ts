// src/app/pages/report/report-list/report-list.component.ts
import {Component, OnInit, signal} from '@angular/core';
import { ReportService } from '../../../services/report-service';
import { Report } from '../../../models/report';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  reports: Report[] = [];
  generateReport = signal<any | null>(null);
  empolyeeEmail: any;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    // Load all reports
    this.reportService.getReports().subscribe((data: Report[]) => {
      this.reports = data;
    });
  }

  downloadReport(reportId: number, format: 'pdf' | 'csv'): void {
    // Download the report in specified format
    this.reportService.downloadReport(reportId, format).subscribe(response => {
      // Handle download logic, e.g., saving file
    });
  }

  viewReportDetails(id: number) {
    
  }
}
