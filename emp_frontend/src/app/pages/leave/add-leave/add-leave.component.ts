import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Leave } from 'src/app/models/leave';
import { Employee } from 'src/app/models/employee';
import {LeaveService} from "../../../services/leave-services";
import {Router} from "@angular/router";
import {delay, of} from "rxjs";
import {AlertService} from "../../../services/alert.service";

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
    private leaveService: LeaveService, // Adjust the import path if needed
    private employeeService: EmployeeService,
    private router: Router,
    private alertService: AlertService,// Inject the Alert Service
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.delay();
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  onSubmit(): void {
    this.leaveService.createLeave(this.leave).subscribe(
      response => {
        // Handle success (e.g., navigate to another page or show a success message)
        this.alertService.setAlert('Leave applied successfully!', 'success');
        this.router.navigate(['/leaves']);
        console.log('Leave added successfully:', response);
      },
      error => {
        // Handle error (e.g., show an error message)
        this.alertMessage = "Failed to apply for leave";
        this.alertType = "warning"
        console.error('Error adding leave:', error);
      }
    );
  }

  delay(){
    // Create an observable that emits a value after a 3-second delay
    of('Delayed action executed').pipe(
      delay(1000) // 3000 milliseconds = 3 seconds
    ).subscribe(message => {
      console.log(message);
      this.isLoading = false;
    });
  }
}
