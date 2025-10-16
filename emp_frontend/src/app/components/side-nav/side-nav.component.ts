import { Component, OnInit } from '@angular/core';
import { AuthService, LoggedUserResponse } from '../../services/auth-services.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  userRole: string | null = null; // For storing user role
  employeeId: number | null = null; // For storing employee ID
  employee: Employee | null = null; // To hold employee details

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    // Fetch the logged-in user's information on initialization
    this.authService.getLoggedInUser().subscribe(
      (response: LoggedUserResponse) => {
        this.userRole = response.role; // Access role name
        if (this.isEmployee()) {
          this.fetchLoggedInEmployee();
        }
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  isEmployee(): boolean {
    return this.userRole === 'EMPLOYEE';
  }

  private fetchLoggedInEmployee(): void {
    // Fetch the logged-in employee details directly
    this.authService.getLoggedInEmployee().subscribe(
      (employee: Employee) => {
        this.employee = employee;
        this.employeeId = employee.id; // Assume 'id' is a property in Employee model
        console.log("hello id is :" + employee.id)
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }
}
