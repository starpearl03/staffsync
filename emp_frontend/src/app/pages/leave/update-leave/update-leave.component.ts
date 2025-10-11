import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeaveService } from "../../../services/leave-services";
import { Employee } from "../../../models/employee";
import { Leave } from "../../../models/leave";
import {delay, of} from "rxjs";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-update-leave',
  templateUrl: './update-leave.component.html',
  styleUrls: ['./update-leave.component.css']
})
export class UpdateLeaveComponent implements OnInit {
  leave: Leave = new Leave();
  employees: Employee[] = [];
  leaveId!: number;
  isLoading = false;
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type
  constructor(
    private leaveService: LeaveService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.delay();
    this.leaveId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLeave();
    this.loadEmployees();
  }

  loadLeave(): void {
    this.leaveService.getLeaveById(this.leaveId).subscribe(data => {
      this.leave = data;
      // Ensure employee is correctly set from the loaded list
      if (this.leave.employee) {
        this.leave.employee = this.employees.find(emp => emp.id === this.leave.employee?.id) || this.leave.employee;
      }
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
      console.log(this.employees); // Verify employee list is loaded correctly
      // Ensure the employee in the leave object matches one in the loaded list
      if (this.leave.employee) {
        this.leave.employee = this.employees.find(emp => emp.id === this.leave.employee?.id) || this.leave.employee;
      }
    });
  }

  onSubmit(): void {
    this.leaveService.updateLeave(this.leaveId, this.leave).subscribe(() => {
      this.alertService.setAlert('Leave updated successfully!', 'success');
      this.router.navigate(['/leaves']);
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
