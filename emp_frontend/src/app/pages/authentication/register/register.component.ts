import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth-services.service";
import {delay, of} from "rxjs";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string | undefined;
  password: string | undefined;
  role: string = 'ADMIN'; // Adjust role as needed
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
      this.authService.register(this.email, this.password, this.role).subscribe(
        () => {
          this.delay();
          console.log('Registration successful');
          this.alertService.setAlert('User has been created successfully!', 'success');
          this.router.navigate(['/employees']);
        },
        error => {
          this.delay();
          this.errorMessage = error;
          console.error('Registration failed', error);
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
