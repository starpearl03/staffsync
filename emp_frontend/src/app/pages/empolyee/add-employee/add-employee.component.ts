import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee';  // Adjust the path if necessary
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';
import {AlertService} from "../../../services/alert.service";
import {delay, of} from "rxjs";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type
  isLoading = false;

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService,// Inject the Alert Service
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.delay();
  }

  saveEmployee(form: NgForm) {
    this.isLoading = true;
    this.employeeService.addEmployee(this.employee).subscribe(
      data => {
        console.log(data);
        this.delay();
        this.alertMessage = 'Employee added successfully!';
        this.alertType = 'success'; // Set alert type
        this.alertService.setAlert('Employee added successfully!', 'success'); // Set alert message
        this.clearForm(form);
        this.goToEmployeeList();
      },
      error => {
        console.log(error);
        this.delay();
        this.alertMessage = 'Error adding employee.';
        this.alertType = 'danger'; // Set alert type
      }
    );
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onSubmit(form: NgForm) {
    console.log(this.employee);
    if (form.valid) {
      this.saveEmployee(form);
    } else {
      this.alertMessage = 'Please fill out the form correctly.';
      this.alertType = 'warning';
    }
  }

  clearForm(form: NgForm) {
    this.employee = new Employee(); // Reset the employee object
    form.resetForm(); // Reset the form
    this.alertMessage = null; // Clear alert message
    this.alertType = 'info'; // Reset alert type
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
