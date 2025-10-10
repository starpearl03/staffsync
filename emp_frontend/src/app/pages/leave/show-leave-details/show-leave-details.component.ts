import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Leave} from "../../../models/leave";
import {LeaveServices} from "../../../services/leave-services";
@Component({
  selector: 'app-show-leave-details',
  templateUrl: './show-leave-details.component.html',
  styleUrls: ['./show-leave-details.component.css']
})
export class ShowLeaveDetailsComponent implements OnInit {
  leave: Leave = new Leave();
  leaveId!: number;

  constructor(private leaveService: LeaveServices, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.leaveId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLeaveDetails();
  }

  loadLeaveDetails(): void {
    this.leaveService.getLeaveById(this.leaveId).subscribe(data => {
      this.leave = data;
    });
  }
}
