import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../models/project';
import {ProjectService} from "../../../services/project-service";
import {AlertService} from "../../../services/alert.service";
import {delay, of} from "rxjs";

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  project: Project = new Project();
  id: number = 0;
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type
  isLoading = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProjectById(this.id).subscribe(data => {
      this.project = data;
    });
    this.delay();
  }

  updateProject(): void {
    this.projectService.updateProject(this.id, this.project).subscribe(() => {
      this.alertService.setAlert('Project updated successfully!', 'success');
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
