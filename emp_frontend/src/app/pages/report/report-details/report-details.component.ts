import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/report';
import {ReportService} from "../../../services/report-service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent implements OnInit {
  report: Report | null = null;

  constructor(private reportService: ReportService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadReportDetails();
  }

  loadReportDetails(): void {
    const reportId = +this.route.snapshot.paramMap.get('id')!;
    this.reportService.getReportById(reportId).subscribe((data: Report) => {
      this.report = data;
    });
  }

  downloadReport(format: 'pdf' | 'csv'): void {
    const reportId = this.report?.id;
    if (reportId) {
      this.reportService.downloadReport(reportId, format).subscribe(response => {
        // Handle download logic, e.g., saving file
        const blob = new Blob([response], { type: format === 'pdf' ? 'application/pdf' : 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report_${reportId}.${format}`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }
}
