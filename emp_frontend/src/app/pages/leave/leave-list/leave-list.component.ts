import {Component, OnInit, signal} from '@angular/core';
import {Leave} from "../../../models/leave";
import {LeaveServices} from "../../../services/leave-services";

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  leaves: Leave[] = [];
  goToLeave = signal<any | null>(null);
  enteredID: any;

  constructor(private leaveService: LeaveServices) { }

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves(): void {
    this.leaveService.getAllLeaves().subscribe(data => {
      this.leaves = data;
    });
  }

  updateLeave(id: number): void {
    // Navigate to the update page
  }

  deleteLeave(id: number): void {
    // Call service to delete leave
  }

  detailsOfLeave(id: number): void {
    // Navigate to the details page
  }

  viewLeaveDetails(id: number) {

  }
}
