import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;

  constructor() {}

  onSubmit() {
    // Implement your login logic here
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}
