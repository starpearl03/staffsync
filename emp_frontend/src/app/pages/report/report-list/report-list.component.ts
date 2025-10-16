import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee';
import { Report } from '../../../models/report'; // Ensure the Report model is imported
import { EmployeeService } from '../../../services/employee.service';
import { ReportService } from '../../../services/report-service';
import {delay, of} from "rxjs";

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  //spinner
  isLoading = false;

  // alert
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type

  reports: Report[] = [];
  employees: Employee[] = [];
  selectedEmployeeId: number | null = null; // Track selected employee ID

  constructor(
    private reportService: ReportService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getReports();
    this.getEmployees();
    this.delay();
  }

  getReports(): void {
    this.reportService.getReports().subscribe(
      (data: Report[]) => {
        console.log('Reports data:', data); // Add this line to debug
        this.reports = data;
      },
      error => console.error('Error fetching reports:', error)
    );
  }

  getEmployees(): void {
    this.isLoading = true;

    this.employeeService.getEmployeesList().subscribe(
      (data: Employee[]) => {
        this.employees = data;
        this.delay();
      },
      error => {
        console.error('Error fetching employees:', error);
        this.delay();
      }
    );
    this.delay();
  }

  async generateReport(): Promise<void> {
    this.isLoading = true;

    if (this.selectedEmployeeId === null) {
      console.error('No employee selected.');
      this.delay(); // 2 seconds delay before returning
      return;
    }

    try {
      const report = await this.reportService.generateReport(this.selectedEmployeeId).toPromise();
      console.log('Report generated successfully:', report);
      this.getReports(); // Refresh the reports list
      this.alertMessage = 'Report generated successfully!';
      this.alertType = 'success'; // Set alert type
    } catch (error) {
      console.error('Error generating report:', error);
      this.alertMessage = 'Failed to generate report';
      this.alertType = 'warning'; // Set alert type
    } finally {
      this.delay(); // 2 seconds delay before setting loading to false
    }
  }

  downloadReport(employeeId: number, type: 'pdf' | 'csv'): void {
    if (!employeeId) return;

    this.isLoading = true;

    const exportFunction = type === 'pdf' ? this.reportService.exportReportAsPdf : this.reportService.exportReportAsCsv;

    exportFunction.call(this.reportService, employeeId).subscribe(
      (response: string) => {
        this.delay();

        if (response) {
          this.alertMessage = `Report exported to: '${response}'`;
          this.alertType = 'success'; // Set alert type
        } else {
          this.alertMessage = `Report exported to report`;
          this.alertType = 'warning'; // Set alert type
          alert('The report was not generated successfully. Please try again later.');
        }
      },
      error => {
        this.delay();

        console.error(`Error exporting report as ${type}:`, error);
        alert('An error occurred while exporting the report. Please try again later.');
      }
    );

  }

  viewReportDetails(id: number) {
    // Implement this method as needed
  }

  delay() {
    of('Delayed action executed').pipe(
      delay(1000)
    ).subscribe(message => {
      console.log(message);
      this.isLoading = false;
    });
  }
}
