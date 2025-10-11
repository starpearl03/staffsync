import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task-service';
import { ProjectService } from '../../../services/project-service';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee';
import { Task } from '../../../models/task';
import { Project } from '../../../models/project';
import {delay, of} from "rxjs";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  task: Task = new Task();
  projects: Project[] = [];
  employees: Employee[] = [];
  statuses: string[] = ['pending', 'in-progress', 'completed']; // Define status options
  isLoading = false;
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type
  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadTask();
    this.loadProjects();
    this.loadEmployees();
    this.delay();
  }

  loadTask(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.taskService.getTaskById(id).subscribe(task => {
      this.task = task;
      // Ensure deadlineDate is in YYYY-MM-DD format
      if (this.task.deadlineDate) {
        this.task.deadlineDate = new Date(this.task.deadlineDate).toISOString().split('T')[0];
      }
      // Ensure status is one of the defined statuses
      if (!this.statuses.includes(this.task.status)) {
        this.task.status = 'pending'; // Default value or handle error
      }
    });
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesList().subscribe(employees => this.employees = employees);
  }

  updateTask(): void {
    this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
      this.alertService.setAlert('Task updated successfully!', 'success');
      this.router.navigate(['/tasks']);
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
