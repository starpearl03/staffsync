import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from "../../../services/task-service";
import { Task } from "../../../models/task";
import {delay, of} from "rxjs";

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
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.delay();
    this.loadTask();
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
}
