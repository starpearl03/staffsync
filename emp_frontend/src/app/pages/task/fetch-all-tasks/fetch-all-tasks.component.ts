import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { TaskService } from "../../../services/task-service";
import { Task } from 'src/app/models/task';
import {delay, of} from "rxjs";
import {AlertService} from "../../../services/alert.service";

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
  constructor(
    private taskService: TaskService,
    private router: Router, // Inject Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
    });
    this.loadTasks();
    this.delay();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = this.tasks; // Initialize with all tasks
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
            this.alertType = 'warning';
          }
        },
        error => {
          console.error('Error fetching tasks:', error);
          this.alertMessage = 'Error fetching task data.';
          this.alertType = 'danger';
          this.filteredTasks = []; // Clear the list in case of an error
        }
      );
    }
  }



  deleteTask(id: number): void {
    this.isLoading = true;
    if (confirm('Are you sure you want to delete this task?')) {
      this.delay();
      this.alertMessage = "Task has been deleted successfully";
      this.alertType = "success";
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  viewTask(id: number): void {
    this.router.navigate([`/task-details/${id}`]); // Use Router for navigation
  }

  editTask(id: number): void {
    this.router.navigate([`/update-task/${id}`]); // Use Router for navigation
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
