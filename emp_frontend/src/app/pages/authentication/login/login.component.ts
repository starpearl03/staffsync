import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth-services.service";
import { delay, of } from "rxjs";
import { AlertService } from "../../../services/alert.service";
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;
  isLoading = false;
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  onSubmit() {
    this.isLoading = true;
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        response => {
          this.delay();
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          this.authService.getLoggedInUser().subscribe(user => {
            if (user.role === 'ADMIN') {
              this.router.navigate(['/employees']); // Redirect to employees if admin
            } else {
              this.authService.getLoggedInEmployee().subscribe(employee => {
                if (employee) {
                  this.router.navigate([`/details-employee/${employee.id}`]); // Redirect to employee details page
                } else {
                  this.alertService.setAlert('Unable to retrieve employee details', 'warning');
                  this.router.navigate(['/login']); // Fallback to login if no employee details found
                }
              });
            }
          });
        },
        error => {
          this.delay();
          this.errorMessage = error;
          console.error('Login failed', error);
        }
      );
    }
  }

  delay() {
    // Create an observable that emits a value after a 1-second delay
    of('Delayed action executed').pipe(
      delay(1000) // 1000 milliseconds = 1 second
    ).subscribe(message => {
      console.log(message);
      this.isLoading = false;
    });
  }
}
