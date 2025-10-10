import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id!: number;
  employee: Employee = new Employee();
  loading = false;
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

    this.loading = true;
    this.employeeService.getEmployeeById(this.id).subscribe(
      data => {
        this.employee = data;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.error = 'Failed to load employee data';
        this.loading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.employee) {
      this.loading = true;
      this.employeeService.updateEmployee(this.id, this.employee).subscribe(
        data => {
          // this.goToEmployeeList();
          this.alertMessage = 'Employee updated .';
          this.alertType = 'success'; // or 'info'
          this.loading = false;
        },
        error => {
          console.log(error);
          this.error = 'Failed to update employee data';
          this.alertMessage = 'Failed to update employee data';
          this.alertType = 'warning';
          this.loading = false;
        }
      );
    }
  }

  goToEmployeeList(): void {
    this.router.navigate(['/show-all-employees']);
  }
}
