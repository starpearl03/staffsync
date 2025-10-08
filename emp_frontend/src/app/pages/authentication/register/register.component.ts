import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullname: any;
  onSubmit = signal<any | null>(null);
  email: any;
  password: any;

}
