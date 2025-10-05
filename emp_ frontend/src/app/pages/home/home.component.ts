import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  goToEmployeeList() {
    this.router.navigate(['/show-all-employees']);
  }
}
