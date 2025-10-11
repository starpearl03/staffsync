import { Component } from '@angular/core';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import {delay, of} from "rxjs";



@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent {
  isLoading = false
  id: number
  employee!: Employee
  constructor(private route: ActivatedRoute, private employeService: EmployeeService) {

    this.id=0
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.delay();
    this.id = this.route.snapshot.params['id'];

    this.employee = new Employee();
    this.employeService.getEmployeeById(this.id).subscribe( data => {
      this.employee = data;
    });
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
