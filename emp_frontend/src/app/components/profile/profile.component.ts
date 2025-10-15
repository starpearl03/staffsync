import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService, LoggedUserResponse } from '../../services/auth-services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isDropdownOpen = false;
  userName: string | null = null; // For storing user email
  userRole: string | null = null;  // For storing user role

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch the logged-in user's information on initialization
    this.authService.getLoggedInUser().subscribe(
      (response: LoggedUserResponse) => {
        this.userName = response.email;
        this.userRole = response.role; // Access role name
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  // Method to toggle the dropdown
  toggleDropdown(event: Event): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    event.stopPropagation(); // Prevent the click event from propagating
  }

  // Method to handle logout
  logout(): void {
    this.authService.logout();
  }

  // Listen for clicks outside the dropdown to close it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }
}
