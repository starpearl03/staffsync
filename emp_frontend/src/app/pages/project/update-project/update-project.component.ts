import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Project} from "../../../models/project";
import {ProjectService} from "../../../services/project-service";

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  project: Project = new Project();
  id: number = 0;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProjectById(this.id).subscribe(data => {
      this.project = data;
    });
  }

  updateProject(): void {
    this.projectService.updateProject(this.project).subscribe(() => {
      this.router.navigate(['/projects']);
    });
  }
}
