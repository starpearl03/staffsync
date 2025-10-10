import {Component, OnInit, signal} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import {LeaveServices} from "../../../services/leave-services";
import {Employee} from "../../../models/employee";
import {Leave} from "../../../models/leave"; // Adjust the import as needed

@Component({
  selector: 'app-update-leave',
  templateUrl: './update-leave.component.html',
  styleUrls: ['./update-leave.component.css']
})
export class UpdateLeaveComponent implements OnInit {
  leave: Leave = new Leave();
  employees: Employee[] = [];
  leaveId!: number;
  onSubmit = signal<any | null>(null);

  constructor(private leaveService: LeaveServices, private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.leaveId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLeave();
    this.loadEmployees();
  }

  loadLeave(): void {
    this.leaveService.getLeaveById(this.leaveId).subscribe(data => {
      this.leave = data;
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  updateLeave(): void {
    this.leaveService.updateLeave(this.leave).subscribe(() => {
      this.router.navigate(['/leaves']);
    });
  }
}
