import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from "../../../services/employee.service";
import { Task } from "../../../models/task";
import { Project } from "../../../models/project";
import { Employee } from "../../../models/employee";
import {TaskService} from "../../../services/task-service";
import {ProjectService} from "../../../services/project-service";
import {delay, of} from "rxjs";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  task: Task = new Task();
  projects: Project[] = [];
  employees: Employee[] = [];
  createTask = signal<any | null>(null);
  isLoading = false;
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.task.project = {id: null} as unknown as Project;
    this.task.employee = {id: null} as unknown as Employee;
    this.loadProjects();
    this.loadEmployees();
    this.delay();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (projects: Project[]) => {
        console.log('Projects loaded:', projects); // Debug statement
        this.projects = projects;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesList().subscribe({
      next: (employees: Employee[]) => {
        console.log('Employees loaded:', employees); // Debug statement
        this.employees = employees;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  saveTask(): void {
    this.taskService.createTask(this.task).subscribe(() => {
      this.alertService.setAlert('Task created successfully!', 'success');
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
