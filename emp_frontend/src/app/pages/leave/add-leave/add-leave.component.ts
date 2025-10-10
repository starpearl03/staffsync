import {Component, OnInit, signal} from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import {Leave} from "../../../models/leave";
import {LeaveServices} from "../../../services/leave-services";
import {Employee} from "../../../models/employee"; // Adjust the import as needed

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.css']
})
export class AddLeaveComponent implements OnInit {
  leave: Leave = new Leave();
  employees: Employee[] = [];
  onSubmit = signal<any | null>(null);

  constructor(private leaveService: LeaveServices, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  addLeave(): void {
    this.leaveService.createLeave(this.leave).subscribe(() => {
      // Navigate back or show success message
    });
  }
}
