import {Component, OnInit, signal} from '@angular/core';
import {TaskService} from "../../../services/task-service";
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-fetch-all-tasks',
  templateUrl: './fetch-all-tasks.component.html',
  styleUrls: ['./fetch-all-tasks.component.css']
})
export class FetchAllTasksComponent implements OnInit {
  tasks: Task[] = [];
  searchQuery: any;
  searchTasks = signal<any | null>(null);

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  viewTask(id: number) {

  }

  editTask(id: number) {

  }
}
