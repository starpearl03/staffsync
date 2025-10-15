import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth-services.service";
import {delay, of} from "rxjs";
import {AlertService} from "../../../services/alert.service";

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
          this.alertService.setAlert('User logged, Welcome back', 'success');
          this.router.navigate(['/employees']); // Fixed spelling of "employees"
        },
        error => {
          this.delay();
          this.errorMessage = error;
          console.error('Login failed', error);
        }
      );
    }
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
