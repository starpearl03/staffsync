import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Leave } from 'src/app/models/leave';
import { Employee } from 'src/app/models/employee';
import { LeaveService } from "../../../services/leave-services";
import { Router } from "@angular/router";
import { delay, of } from "rxjs";
import { AlertService } from "../../../services/alert.service";
import {AuthService} from "../../../services/auth-services.service";

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.css']
})
export class AddLeaveComponent implements OnInit {
  leave: Leave = new Leave();
  employees: Employee[] = [];
  isLoading = false;
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type

  constructor(
    private leaveService: LeaveService,
    private employeeService: EmployeeService,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService // Inject AuthService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.delay();
    this.loadEmployees();
    this.setLoggedInEmployeeDetails();
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  setLoggedInEmployeeDetails(): void {
    this.authService.getLoggedInEmployee().subscribe(
      loggedInEmployee => {
        this.leave.employee = loggedInEmployee; // Set the logged-in employee
        this.leave.status = 'Pending'; // Set status to 'Pending'
        this.isLoading = false; // Stop the loading spinner
      },
      error => {
        this.alertMessage = "Failed to load employee details";
        this.alertType = "warning";
        console.error('Error fetching logged-in employee details:', error);
      }
    );
  }

  onSubmit(): void {
    this.leaveService.createLeave(this.leave).subscribe(
      response => {
        // Handle success
        this.alertService.setAlert('Leave applied successfully!', 'success');
        this.router.navigate(['/leaves']);
        console.log('Leave added successfully:', response);
      },
      error => {
        // Handle error
        this.alertMessage = "Failed to apply for leave";
        this.alertType = "warning";
        console.error('Error adding leave:', error);
      }
    );
  }

  delay(){
    // Create an observable that emits a value after a 1-second delay
    of('Delayed action executed').pipe(
      delay(1000) // 1000 milliseconds = 1 second
    ).subscribe(message => {
      console.log(message);
    });
  }
}
