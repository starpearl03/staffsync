import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Leave } from "../../../models/leave";
import {LeaveService} from "../../../services/leave-services";
import {delay, of} from "rxjs";

@Component({
  selector: 'app-show-leave-details',
  templateUrl: './show-leave-details.component.html',
  styleUrls: ['./show-leave-details.component.css']
})
export class ShowLeaveDetailsComponent implements OnInit {
  leave: Leave = new Leave();
  leaveId!: number;
  isLoading = false;
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type
  constructor(private leaveService: LeaveService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.delay();
    this.leaveId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLeaveDetails();
  }

  loadLeaveDetails(): void {
    this.leaveService.getLeaveById(this.leaveId).subscribe(data => {
      this.leave = data;
    });
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
