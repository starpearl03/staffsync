import { Component } from '@angular/core';
import {ProjectService} from "../../../services/project-service";
import {Project} from "../../../models/project";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  project: Project = new Project();

  constructor(private projectService: ProjectService, private router: Router) { }

  addProject(): void {
    this.projectService.addProject(this.project).subscribe(() => {
      this.router.navigate(['/projects']);
    });
  }
}
