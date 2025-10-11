import { Component } from '@angular/core';
import { Project } from '../../../models/project';
import { Router } from '@angular/router';
import {ProjectService} from "../../../services/project-service";
import {AlertService} from "../../../services/alert.service";
import {delay, of} from "rxjs";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  project: Project = new Project();
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type
  isLoading = false;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private alertService: AlertService
  ) { }
  ngOnInit(): void{
    this.isLoading = true;
    this.delay();
  }
  addProject(): void {
    this.projectService.addProject(this.project).subscribe(() => {
      this.alertService.setAlert('Project created successfully!', 'success');
      this.router.navigate(['/projects']);
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
