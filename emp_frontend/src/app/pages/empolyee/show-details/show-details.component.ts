import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import {catchError, delay, of, switchMap} from "rxjs";
import {AuthService, LoggedUserResponse} from "../../../services/auth-services.service";

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {
  isLoading = false;
  id: number;
  employee!: Employee;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {
    this.id = 0;
  }

  ngOnInit(): void {
    this.checkUserRole();
    this.isLoading = true;
    this.id = this.route.snapshot.params['id'];

    this.employee = new Employee();
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
      this.isLoading = false;
    });

  }

  checkUserRole(): void {
    console.log("Checking user role...");

    this.authService.getLoggedInUser().pipe(
      switchMap((loggedUser: LoggedUserResponse) => {
        console.log("Logged user:", loggedUser);
        if (loggedUser.role === 'EMPLOYEE') {
          return this.authService.getLoggedInEmployee().pipe(
            switchMap((employee) => {
              if (employee) {
                this.isAdmin = employee.role === 'ADMIN';
                console.log("Role:", employee.role);
              } else {
                console.log("No logged in employee found.");
              }
              return of(null);
            }),
            catchError(error => {
              console.error('Error fetching employee details:', error);
              return of(null);
            })
          );
        } else {
          // If user is not EMPLOYEE (i.e., ADMIN or other roles), we handle it here.
          this.isAdmin = loggedUser.role === 'ADMIN';
          console.log("Role:", loggedUser.role);
          return of(null);
        }
      }),
      catchError(error => {
        console.error('Error fetching logged-in user:', error);
        return of(null);
      })
    ).subscribe();
  }
}
