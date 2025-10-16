import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from "../../../services/task-service";
import { Task } from "../../../models/task";
import {catchError, delay, of, switchMap} from "rxjs";
import {AuthService, LoggedUserResponse} from "../../../services/auth-services.service";

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  task: Task = new Task();
  isLoading = false;
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type
  userRole: string = ''; // Store the user role
  isAdmin: boolean = false; // Flag to check if the user is an admin
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.delay();
    this.loadTask();
    this.loadUserRole();
  }

  loadTask(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.taskService.getTaskById(id).subscribe(task => this.task = task);
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

  loadUserRole(): void {
    this.authService.getLoggedInUser().pipe(
      switchMap((loggedUser: LoggedUserResponse) => {
        this.userRole = loggedUser.role;
        this.isAdmin = this.userRole === 'ADMIN'; // Set isAdmin based on user role
        return of(this.isAdmin);
      }),
      catchError(error => {
        console.error('Error fetching user role:', error);
        this.alertMessage = 'Error fetching user role.';
        this.alertType = 'danger';
        return of(false);
      })
    ).subscribe(() => {
      this.isLoading = false; // Set loading to false after role is fetched
    });
  }
}
