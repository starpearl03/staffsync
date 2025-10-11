import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/report';
import { ReportService } from '../../../services/report-service';
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

  downloadReport(employeeId: number, type: 'pdf' | 'csv'): void {
    if (!employeeId) return;

    const exportFunction = type === 'pdf' ? this.reportService.exportReportAsPdf : this.reportService.exportReportAsCsv;

    exportFunction.call(this.reportService, employeeId).subscribe(
      (response: any) => {
        // Assuming response contains the path of the exported document
        const path = response.path;
        alert(`The report has been exported. You can download it from: ${path}`);
      },
      error => console.error(`Error exporting report as ${type}:`, error)
    );
  }


}
