import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { TaskService } from "../../../services/task-service";
import { Task } from 'src/app/models/task';
import { catchError, delay, of, switchMap } from "rxjs";
import { AlertService } from "../../../services/alert.service";
import { Employee } from "../../../models/employee";
import { AuthService, LoggedUserResponse } from "../../../services/auth-services.service";

@Component({
  selector: 'app-fetch-all-tasks',
  templateUrl: './fetch-all-tasks.component.html',
  styleUrls: ['./fetch-all-tasks.component.css']
})
export class FetchAllTasksComponent implements OnInit {
  tasks: Task[] = [];
  searchTitle: string = '';
  filteredTasks: Task[] = []; // Property to hold search results
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type
  isLoading = false;
  isAdmin = false; // Flag to indicate if the user is an admin

  constructor(
    private taskService: TaskService,
    private router: Router, // Inject Router
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
    });
    this.loadTasks();
    this.delay()
  }

  loadTasks(): void {
    this.isLoading = true; // Set loading to true at the start

    // Fetch the logged-in user's role first
    this.authService.getLoggedInUser().pipe(
      switchMap((loggedUser: LoggedUserResponse) => {
        const userRole = loggedUser.role;
        this.isAdmin = userRole === 'ADMIN'; // Set the isAdmin flag based on the role

        if (userRole === 'EMPLOYEE') {
          // If the role is EMPLOYEE, fetch employee details and filter tasks
          return this.authService.getLoggedInEmployee().pipe(
            switchMap((employee: Employee) => {
              // Fetch tasks and filter based on employee ID
              return this.taskService.getTasks().pipe(
                switchMap((tasks: Task[]) => {
                  this.tasks = tasks;
                  this.filteredTasks = this.tasks.filter(task => task.employee.id === employee.id);
                  return of(this.filteredTasks);
                }),
                catchError(error => {
                  console.error('Error fetching tasks for employee:', error);
                  this.alertMessage = 'Error fetching tasks for employee.';
                  this.alertType = 'danger';
                  this.filteredTasks = [];
                  return of([]);
                })
              );
            }),
            catchError(error => {
              // Handle errors from fetching the employee details
              console.error('Error fetching employee details:', error);
              this.alertMessage = 'Error fetching employee details.';
              this.alertType = 'danger';
              this.filteredTasks = [];
              return of([]);
            })
          );
        } else {
          // If not EMPLOYEE (i.e., ADMIN), fetch all tasks
          return this.taskService.getTasks().pipe(
            switchMap((tasks: Task[]) => {
              this.tasks = tasks;
              this.filteredTasks = this.tasks; // Show all tasks for admin
              return of(this.filteredTasks);
            }),
            catchError(error => {
              console.error('Error fetching tasks for admin:', error);
              this.alertMessage = 'Error fetching tasks for admin.';
              this.alertType = 'danger';
              this.filteredTasks = [];
              return of([]);
            })
          );
        }
      }),
      catchError(error => {
        // Handle errors from fetching the logged-in user
        console.error('Error fetching logged-in user:', error);
        this.alertMessage = 'Error fetching user data.';
        this.alertType = 'danger';
        // Attempt to fetch tasks for admin if there is an error
        return this.taskService.getTasks().pipe(
          switchMap((tasks: Task[]) => {
            this.tasks = tasks;
            this.filteredTasks = this.tasks; // Show all tasks for admin
            return of(this.filteredTasks);
          }),
          catchError(err => {
            console.error('Error fetching tasks after user error:', err);
            this.alertMessage = 'Error fetching tasks.';
            this.alertType = 'danger';
            this.filteredTasks = [];
            return of([]);
          })
        );
      })
    ).subscribe(() => {
      this.delay() // Set loading to false after tasks are fetched
    });
  }

  searchTasks(): void {
    if (this.searchTitle.trim() === '') {
      this.filteredTasks = this.tasks; // Reset to all tasks if search query is empty
    } else {
      const searchValue = this.searchTitle.trim().toLowerCase();

      this.taskService.getTasks().subscribe(
        (tasks: Task[]) => {
          // Filter tasks based on the search query
          this.filteredTasks = tasks.filter(task => {
            // Attempt to convert search term to a number for ID comparison
            const id = Number(searchValue);
            if (!isNaN(id)) {
              return task.id === id;
            } else {
              return task.title.toLowerCase().includes(searchValue);
            }
          });

          if (this.filteredTasks.length > 0) {
            this.alertMessage = 'Tasks found.';
            this.alertType = 'info'; // or 'success'
          } else {
            this.alertMessage = 'No tasks found.';
            this.alertType = 'warning'; // or 'info'
          }
        },
        error => {
          console.error('Error searching tasks:', error);
          this.alertMessage = 'Error searching tasks.';
          this.alertType = 'danger';
          this.filteredTasks = [];
        }
      );
    }
  }

  viewTask(id: number): void {
    this.router.navigate([`/task-details/${id}`]);
  }

  editTask(id: number): void {
    this.router.navigate([`/update-task/${id}`]);
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(
        () => {
          this.filteredTasks = this.filteredTasks.filter(task => task.id !== id);
          this.alertMessage = 'Task deleted successfully.';
          this.alertType = 'success';
        },
        error => {
          console.error('Error deleting task:', error);
          this.alertMessage = 'Error deleting task.';
          this.alertType = 'danger';
        }
      );
    }
  }

  delay() {
    of('Delayed action executed').pipe(
      delay(1000)
    ).subscribe(message => {
      console.log(message);
      this.isLoading = false;
    });
  }
}
