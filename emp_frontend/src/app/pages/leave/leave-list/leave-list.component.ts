import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from 'src/app/services/leave-services';
import { Leave } from 'src/app/models/leave';
import { of, switchMap, catchError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AlertService } from "../../../services/alert.service";
import { AuthService, LoggedUserResponse } from 'src/app/services/auth-services.service';
import {Employee} from "../../../models/employee";

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  leaves: Leave[] = [];
  enteredID: string = ''; // Use string to handle input from form
  isLoading = false;
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type
  userRole: string = ''; // Role of the logged-in user

  constructor(
    private leaveService: LeaveService,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
    });
    this.loadLeaves();
    this.delay();
  }

  loadLeaves(): void {
    this.authService.getLoggedInUser().pipe(
      switchMap((loggedUser: LoggedUserResponse) => {
        this.userRole = loggedUser.role;

        if (this.userRole === 'EMPLOYEE') {
          return this.authService.getLoggedInEmployee().pipe(
            switchMap((employee: Employee) => {
              return this.leaveService.getLeaves().pipe(
                switchMap((leaves: Leave[]) => {
                  this.leaves = leaves.filter(leave => leave.employee.id === employee.id);
                  return of(this.leaves);
                }),
                catchError(error => {
                  console.error('Error fetching leaves for employee:', error);
                  this.alertMessage = 'Error fetching leaves for employee.';
                  this.alertType = 'danger';
                  this.leaves = [];
                  return of([]);
                })
              );
            }),
            catchError(error => {
              console.error('Error fetching employee details:', error);
              this.alertMessage = 'Error fetching employee details.';
              this.alertType = 'danger';
              this.leaves = [];
              return of([]);
            })
          );
        } else {
          return this.leaveService.getLeaves().pipe(
            switchMap((leaves: Leave[]) => {
              this.leaves = leaves;
              return of(this.leaves);
            }),
            catchError(error => {
              console.error('Error fetching leaves for admin:', error);
              this.alertMessage = 'Error fetching leaves for admin.';
              this.alertType = 'danger';
              this.leaves = [];
              return of([]);
            })
          );
        }
      }),
      catchError(error => {
        console.error('Error fetching logged-in user:', error);
        this.alertMessage = 'Error fetching user data.';
        this.alertType = 'danger';
        return this.leaveService.getLeaves().pipe(
          switchMap((leaves: Leave[]) => {
            this.leaves = leaves;
            return of(this.leaves);
          }),
          catchError(err => {
            console.error('Error fetching leaves after user error:', err);
            this.alertMessage = 'Error fetching leaves.';
            this.alertType = 'danger';
            this.leaves = [];
            return of([]);
          })
        );
      })
    ).subscribe(() => {
      this.delay(); // Set loading to false after leaves are fetched
    });
  }

  updateLeave(id: number): void {
    if (this.userRole !== 'EMPLOYEE') {
      this.router.navigate([`/update-leave/${id}`]);
    }
  }

  deleteLeave(id: number): void {
    if (this.userRole !== 'EMPLOYEE') {
      this.isLoading = true;
      if (confirm('Are you sure you want to delete this leave?')) {
        this.delay();
        this.alertMessage = "Leave has been deleted successfully";
        this.alertType = "success";
        this.leaveService.deleteLeave(id).subscribe(
          () => {
            this.loadLeaves(); // Refresh the list after deletion
          },
          error => {
            console.error('Error deleting leave:', error);
          }
        );
      }
    }
    this.delay();
  }

  viewLeaveDetails(id: number): void {
    this.router.navigate([`/leave/${id}`]);
  }

  goToLeave(): void {
    const id = Number(this.enteredID);
    if (!isNaN(id)) {
      this.leaveService.getLeaveById(id).subscribe(
        data => {
          this.leaves = [data]; // Show only the matching leave
        },
        error => {
          console.error('Error fetching leave:', error);
          this.leaves = []; // Clear the list if an error occurs
        }
      );
    } else {
      this.loadLeaves(); // Load all leaves if no valid ID is entered
    }
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
