import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee';  // Adjust the path if necessary
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';
import { AlertService } from "../../../services/alert.service";
import { delay, of } from "rxjs";
import {AuthService} from "../../../services/auth-services.service";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  alertMessage: string | null = null;
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info';
  isLoading = false;

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private authService: AuthService, // Inject AuthService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.delay();
  }

  saveEmployee(form: NgForm) {
    if (this.employee.password !== this.employee.confirmPassword) {
      this.alertMessage = 'Passwords must match!';
      this.alertType = 'warning';
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.employee.role = 'EMPLOYEE'; // Ensure role is set

    // First register the user
    this.authService.register(this.employee.email, this.employee.password, this.employee.role).subscribe(
      () => {
        // On successful registration, add the employee
        this.employeeService.addEmployee(this.employee).subscribe(
          data => {
            console.log(data);
            this.delay();
            this.alertMessage = 'Employee added successfully!';
            this.alertType = 'success';
            this.alertService.setAlert(this.alertMessage, this.alertType);
            this.clearForm(form);
            this.goToEmployeeList();
          },
          error => {
            console.log(error);
            this.delay();
            this.alertMessage = 'Error adding employee.';
            this.alertType = 'danger';
          }
        );
      },
      error => {
        console.log(error);
        this.delay();
        this.alertMessage = 'Error registering user.';
        this.alertType = 'danger';
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
    this.employee = new Employee();
    form.resetForm();
    this.alertMessage = null;
    this.alertType = 'info';
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
