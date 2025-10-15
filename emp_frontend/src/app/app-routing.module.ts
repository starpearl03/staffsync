import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/empolyee/employee-list/employee-list.component';
import { AddEmployeeComponent } from './pages/empolyee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './pages/empolyee/update-employee/update-employee.component';
import { ShowDetailsComponent } from './pages/empolyee/show-details/show-details.component';
import {LoginComponent} from "./pages/authentication/login/login.component";
import {RegisterComponent} from "./pages/authentication/register/register.component";
import {UpdateProjectComponent} from "./pages/project/update-project/update-project.component";
import {CreateProjectComponent} from "./pages/project/create-project/create-project.component";
import {ProjectListComponent} from "./pages/project/project-list/project-list.component";
import {ShowProjectComponent} from "./pages/project/show-project/show-project.component";
import {FetchAllTasksComponent} from "./pages/task/fetch-all-tasks/fetch-all-tasks.component";
import {CreateTaskComponent} from "./pages/task/create-task/create-task.component";
import {UpdateTaskComponent} from "./pages/task/update-task/update-task.component";
import {ViewTaskComponent} from "./pages/task/view-task/view-task.component";
import {NotificationListComponent} from "./pages/notification/notification-list/notification-list.component";
import {NotificationDetailsComponent} from "./pages/notification/notification-details/notification-details.component";
import {LeaveListComponent} from "./pages/leave/leave-list/leave-list.component";
import {AddLeaveComponent} from "./pages/leave/add-leave/add-leave.component";
import {UpdateLeaveComponent} from "./pages/leave/update-leave/update-leave.component";
import {ShowLeaveDetailsComponent} from "./pages/leave/show-leave-details/show-leave-details.component";
import {ReportListComponent} from "./pages/report/report-list/report-list.component";
import {ReportDetailsComponent} from "./pages/report/report-details/report-details.component";
import {AuthGuard} from "./pages/authentication/auth.guard";

const routes: Routes = [

  // Employee routes
  {path:"employees",component: EmployeeListComponent, canActivate: [AuthGuard] },
  {path:"add-employee", component: AddEmployeeComponent, canActivate: [AuthGuard] },
  {path:'update-employee/:id',component:UpdateEmployeeComponent, canActivate: [AuthGuard] },
  {path:'details-employee/:id',component:ShowDetailsComponent, canActivate: [AuthGuard] },

  // Project routes
  { path: 'projects', component: ProjectListComponent , canActivate: [AuthGuard] },
  { path: 'add-project', component: CreateProjectComponent , canActivate: [AuthGuard] },
  { path: 'update-project/:id', component: UpdateProjectComponent , canActivate: [AuthGuard] },
  { path: 'project-details/:id', component: ShowProjectComponent , canActivate: [AuthGuard] },

  // Task routes
  { path: 'tasks', component: FetchAllTasksComponent , canActivate: [AuthGuard] },
  { path: 'add-task', component: CreateTaskComponent , canActivate: [AuthGuard] },
  { path: 'update-task/:id', component: UpdateTaskComponent , canActivate: [AuthGuard] },
  { path: 'task-details/:id', component: ViewTaskComponent , canActivate: [AuthGuard] },

  // Leave routes
  { path: 'leaves', component: LeaveListComponent , canActivate: [AuthGuard] },
  { path: 'leave/:id', component: ShowLeaveDetailsComponent , canActivate: [AuthGuard] },
  { path: 'add-leave', component: AddLeaveComponent , canActivate: [AuthGuard] },
  { path: 'update-leave/:id', component: UpdateLeaveComponent , canActivate: [AuthGuard] },

  // Report routes
  { path: 'reports', component: ReportListComponent , canActivate: [AuthGuard] }, // List of reports
  { path: 'reports/:id', component: ReportDetailsComponent , canActivate: [AuthGuard] }, // View report details
  { path: 'reports/:id/download/:format', component: ReportDetailsComponent , canActivate: [AuthGuard] }, // Download report (PDF or CSV)

  // Notification routes
  { path: 'view-notifications', component: NotificationListComponent , canActivate: [AuthGuard] },
  { path: 'notification/:id', component: NotificationDetailsComponent , canActivate: [AuthGuard] },

  // Authentication Routes
  {path:'', redirectTo: "login", pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
