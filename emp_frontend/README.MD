
---

# Getting Started with the Angular Project

## Prerequisites

- **Node.js**: Make sure Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **Angular CLI**: Install Angular CLI globally using the following command:
  ```bash
  npm install -g @angular/cli
  ```
- **Bootstrap 5**: Ensure you are using Bootstrap 5 for styling.

## Project Setup

### 1. **Clone the Repository**

First, clone the repository where your Angular project is hosted:
```bash
git clone https://github.com/kudzaiprichard/employee-management-system.git
cd employee-management-system-main
```

### 2. **Install Dependencies**

Navigate to the project folder and install the required dependencies:
```bash
npm install
```

### 3. **Run the Application**

Start the Angular development server:
```bash
ng serve
```
The application will be accessible at `http://localhost:4200`.

## Folder Structure

Here's a brief overview of the folder structure and its components:

- **`src/app/components/`**: Contains reusable UI components.
- **`src/app/models/`**: Contains TypeScript models for your data structures.
- **`src/app/pages/`**: Contains the various pages/views of your application.
- **`src/app/services/`**: Contains service files for handling API requests and business logic.

## Service Integration

### 1. **Alert Service**

The `AlertService` handles the display of alerts within the application.

**Usage Example:**

```typescript
import { Component } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  constructor(private alertService: AlertService) {}

  showAlert() {
    this.alertService.setAlert('This is an info alert!', 'info');
  }
}
```

### 2. **Auth Service**

The `AuthService` manages authentication tasks such as login, registration, and token handling.

**Usage Example:**

```typescript
import { Component } from '@angular/core';
import { AuthService } from '../services/auth-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful');
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
```

### 3. **Employee Service**

The `EmployeeService` handles CRUD operations for employee data.

**Usage Example:**

```typescript
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployeesList().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Error fetching employees', error);
      }
    });
  }
}
```

### 4. **Leave Service**

The `LeaveService` is responsible for managing leave-related data.

**Usage Example:**

```typescript
import { Component } from '@angular/core';
import { LeaveService } from '../services/leave.service';
import { Leave } from '../models/leave';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent {
  constructor(private leaveService: LeaveService) {}

  requestLeave(leave: Leave) {
    this.leaveService.createLeave(leave).subscribe({
      next: (response) => {
        console.log('Leave request submitted');
      },
      error: (error) => {
        console.error('Error submitting leave request', error);
      }
    });
  }
}
```

### 5. **Notification Service**

The `NotificationService` handles notification-related actions.

**Usage Example:**

```typescript
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../models/notification';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.getNotifications(1).subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: (error) => {
        console.error('Error fetching notifications', error);
      }
    });
  }
}
```

### 6. **Project Service**

The `ProjectService` manages project data.

**Usage Example:**

```typescript
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        console.error('Error fetching projects', error);
      }
    });
  }
}
```

### 7. **Report Service**

The `ReportService` handles report generation and exporting.

**Usage Example:**

```typescript
import { Component } from '@angular/core';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  constructor(private reportService: ReportService) {}

  generateReport(employeeId: number) {
    this.reportService.generateReport(employeeId).subscribe({
      next: (response) => {
        console.log('Report generated');
      },
      error: (error) => {
        console.error('Error generating report', error);
      }
    });
  }
}
```

### 8. **Task Service**

The `TaskService` manages task data and operations.

**Usage Example:**

```typescript
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      }
    });
  }
}
```

## Authentication Guards and Interceptors

### 1. **Auth Guard**

The `AuthGuard` ensures that only authenticated users can access certain routes.

**Usage Example:**

In your routing module:
```typescript
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // other routes
];
```

### 2. **Auth Interceptor**

The `AuthInterceptor` attaches the JWT token to outgoing HTTP requests.

**Usage Example:**

In your `app.module.ts`:
```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppModule { }
```

## How to Contribute

If you would like to contribute to the project, please follow these steps:

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them locally.
4. Submit a pull request with a clear description of your changes.

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
- [RxJS Documentation](https://rxjs.dev/)

---

Feel free to adjust this guide according to your project’s specific needs.
