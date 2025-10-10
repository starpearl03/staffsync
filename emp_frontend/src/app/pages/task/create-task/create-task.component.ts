import {Component, OnInit, signal} from '@angular/core';
import { Router } from '@angular/router';
import {TaskService} from "../../../services/task-service";
import {ProjectService} from "../../../services/project-service";
import {EmployeeService} from "../../../services/employee.service";
import {Task} from "../../../models/task";
import {Project} from "../../../models/project";
import {Employee} from "../../../models/employee";

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

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadEmployees();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesList().subscribe(employees => this.employees = employees);
  }

  saveTask(): void {
    this.taskService.createTask(this.task).subscribe(() => {
      this.router.navigate(['/fetch-all-tasks']);
    });
  }
}
