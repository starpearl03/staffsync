import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  enteredID?: number;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  goToEmployee(): void {
    if (this.enteredID !== undefined) {
      console.log(this.enteredID);
      this.router.navigate(['details-of-employee', this.enteredID]);
    }
  }

  getEmployees(): void {
    this.employeeService.getEmployeesList().subscribe({
      next: (data: Employee[]) => this.employees = data,
      error: (err) => console.error('Error fetching employees', err)
    });
  }

  updateEmployee(id: number): void {
    this.router.navigate(['updating-by-id', id]);
  }

  deleteEmployee(id: number): void {
    if (confirm(`Are you sure you want to delete Employee ID: ${id}?`)) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          console.log(`Deleted employee ID: ${id}`);
          this.getEmployees();
        },
        error: (err) => console.error('Error deleting employee', err)
      });
    }
  }

  detailsOfEmployee(id: number): void {
    this.router.navigate(['details-of-employee', id]);
  }
}
