import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import {delay, of} from "rxjs";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id!: number;
  employee: Employee = new Employee();
  isLoading = false;
  error: string | null = null;
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.isLoading = true;
    this.employeeService.getEmployeeById(this.id).subscribe(
      data => {
        this.employee = data;
      },
      error => {
        console.log(error);
        this.error = 'Failed to load employee data';
      }
    );
    this.delay();
  }

  onSubmit(): void {
    if (this.employee) {
      this.isLoading = true;
      this.employeeService.updateEmployee(this.id, this.employee).subscribe(
        data => {
          // this.goToEmployeeList();
          this.delay();
          this.alertMessage = 'Employee updated .';
          this.alertType = 'success'; // or 'info'
        },
        error => {
          this.delay();
          console.log(error);
          this.error = 'Failed to update employee data';
          this.alertMessage = 'Failed to update employee data';
          this.alertType = 'warning';
        }
      );
    }
  }

  goToEmployeeList(): void {
    this.router.navigate(['/show-all-employees']);
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
