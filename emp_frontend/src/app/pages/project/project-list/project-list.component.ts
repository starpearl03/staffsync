import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../models/project';
import {ProjectService} from "../../../services/project-service";
import {AlertService} from "../../../services/alert.service";
import {delay, of} from "rxjs";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  searchTitle: string = '';
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type
  isLoading = false;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
    });
    this.getProjects();
    this.delay();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  searchProjects(): void {
    if (this.searchTitle.trim() === '') {
      this.getProjects();
    } else {
      this.projectService.getProjects().subscribe(
        (projects: Project[]) => {
          let project: Project | undefined;

          // Attempt to convert search term to a number for ID comparison
          const id = Number(this.searchTitle);
          if (!isNaN(id)) {
            project = projects.find(proj => proj.id === id);
          } else {
            project = projects.find(proj => proj.title.toLowerCase() === this.searchTitle.toLowerCase());
          }

          if (project) {
            console.log('Searching:', this.searchTitle);
            this.projects = [project]; // Display the found project in the list
            this.alertMessage = 'Project found.';
            this.alertType = 'info'; // or 'success'
          } else {
            this.alertMessage = 'Project not found.';
            this.alertType = 'warning';
            console.error('Project not found.');
            this.projects = []; // Clear the list if no project is found
          }
        },
        error => {
          console.error('Error fetching projects:', error);
          this.alertMessage = 'Error fetching project data.';
          this.alertType = 'danger';
          this.projects = []; // Clear the list in case of an error
        }
      );
    }
  }


  updateProject(id: number): void {
    this.router.navigate([`/update-project/${id}`]);
  }

  deleteProject(id: number): void {
    this.isLoading = true;
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (confirmed) {
      this.delay();
      this.alertMessage = "Task has been deleted successfully";
      this.alertType = "success";
      this.projectService.deleteProject(id).subscribe(() => {
        this.getProjects();
      });
    }
  }


  viewProjectDetails(id: number): void {
    this.router.navigate([`/project-details/${id}`]);
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
