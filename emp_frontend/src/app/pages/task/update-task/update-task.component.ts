import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {TaskService} from "../../../services/task-service";
import {ProjectService} from "../../../services/project-service";
import {EmployeeService} from "../../../services/employee.service";
import {Employee} from "../../../models/employee";
import {Task} from "../../../models/task";
import {Project} from "../../../models/project";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  task: Task = new Task();
  projects: Project[] = [];
  employees: Employee[] = [];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTask();
    this.loadProjects();
    this.loadEmployees();
  }

  loadTask(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.taskService.getTask(id).subscribe(task => this.task = task);
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }

  loadEmployees(): void {
    this.employeeService.getEmployeesList().subscribe(employees => this.employees = employees);
  }

  updateTask(): void {
    this.taskService.updateTask(this.task).subscribe(() => {
      this.router.navigate(['/fetch-all-tasks']);
    });
  }
}
