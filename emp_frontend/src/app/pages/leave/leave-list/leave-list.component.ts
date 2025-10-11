import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from 'src/app/services/leave-services';
import { Leave } from 'src/app/models/leave';
import {delay, of} from "rxjs";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  leaves: Leave[] = [];
  enteredID: string = ''; // Use string to handle input from form
  isLoading = false;
  alertMessage: string | null = null; // Alert message
  alertType: 'info' | 'success' | 'warning' | 'danger' = 'info'; // Alert type
  constructor(
    private leaveService: LeaveService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
    });
    this.delay();
    this.loadLeaves();
  }

  loadLeaves(): void {
    this.leaveService.getLeaves().subscribe(data => {
      this.leaves = data;
    });
  }

  updateLeave(id: number): void {
    this.router.navigate([`/update-leave/${id}`]);
  }

  deleteLeave(id: number): void {
    this.isLoading = true;
    if (confirm('Are you sure you want to delete this leave?')) {
      this.delay();
      this.alertMessage = "Task has been deleted successfully";
      this.alertType = "success";
      this.leaveService.deleteLeave(id).subscribe(
        () => {
          this.loadLeaves(); // Refresh the list after deletion
        },
        error => {
          console.error('Error deleting leave:', error);
        }
      );
    }
  }

  viewLeaveDetails(id: number): void {
    this.router.navigate([`/leave/${id}`]);
  }

  goToLeave(): void {
    const id = Number(this.enteredID);
    if (!isNaN(id)) {
      this.leaveService.getLeaveById(id).subscribe(
        data => {
          this.leaves = [data]; // Show only the matching leave
        },
        error => {
          console.error('Error fetching leave:', error);
          this.leaves = []; // Clear the list if an error occurs
        }
      );
    } else {
      this.loadLeaves(); // Load all leaves if no valid ID is entered
    }
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
