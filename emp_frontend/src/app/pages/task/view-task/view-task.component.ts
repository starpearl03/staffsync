import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TaskService} from "../../../services/task-service";
import {Task} from "../../../models/task";

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  task: Task = new Task();

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.taskService.getTask(id).subscribe(task => this.task = task);
  }
}
