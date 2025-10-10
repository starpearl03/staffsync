import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Project} from "../../../models/project";
import {ProjectService} from "../../../services/project-service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  searchTitle: string = '';

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  searchProjects(): void {
    this.projectService.searchProjects(this.searchTitle).subscribe(data => {
      this.projects = data;
    });
  }

  updateProject(id: number): void {
    this.router.navigate([`/update-project/${id}`]);
  }

  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe(() => {
      this.getProjects();
    });
  }

  viewProjectDetails(id: number): void {
    this.router.navigate([`/project-details/${id}`]);
  }
}
