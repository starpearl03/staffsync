import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee';  // Adjust the path if necessary
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = new Employee();

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveEmployee() {
    this.employeeService.addEmployee(this.employee).subscribe(data => {
        console.log(data);
        this.goToEmployeeList();
      },
      error => console.log(error));
  }

  goToEmployeeList() {
    this.router.navigate(['/show-all-employees']);
  }

  onSubmit() {
    console.log(this.employee);
    this.saveEmployee();
  }
}
