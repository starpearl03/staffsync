import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EmployeeListComponent } from './pages/empolyee/employee-list/employee-list.component';
import { AddEmployeeComponent } from './pages/empolyee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './pages/empolyee/update-employee/update-employee.component';
import { ShowDetailsComponent } from './pages/empolyee/show-details/show-details.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { CreateProjectComponent } from './pages/project/create-project/create-project.component';
import { UpdateProjectComponent } from './pages/project/update-project/update-project.component';
import { ShowProjectComponent } from './pages/project/show-project/show-project.component';
import { ProjectListComponent } from './pages/project/project-list/project-list.component';
import { CreateTaskComponent } from './pages/task/create-task/create-task.component';
import { UpdateTaskComponent } from './pages/task/update-task/update-task.component';
import { ViewTaskComponent } from './pages/task/view-task/view-task.component';
import { FetchAllTasksComponent } from './pages/task/fetch-all-tasks/fetch-all-tasks.component';
import { LeaveListComponent } from './pages/leave/leave-list/leave-list.component';
import { AddLeaveComponent } from './pages/leave/add-leave/add-leave.component';
import { UpdateLeaveComponent } from './pages/leave/update-leave/update-leave.component';
import { ShowLeaveDetailsComponent } from './pages/leave/show-leave-details/show-leave-details.component';
import { NotificationListComponent } from './pages/notification/notification-list/notification-list.component';
import { NotificationDetailsComponent } from './pages/notification/notification-details/notification-details.component';
import { ReportListComponent } from './pages/report/report-list/report-list.component';
import { ReportDetailsComponent } from './pages/report/report-details/report-details.component';
import { AlertComponent } from './components/alert/alert.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {AuthInterceptor} from "./pages/authentication/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    ShowDetailsComponent,
    SideNavComponent,
    FooterComponent,
    NotificationComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    CreateProjectComponent,
    UpdateProjectComponent,
    ShowProjectComponent,
    ProjectListComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    ViewTaskComponent,
    FetchAllTasksComponent,
    LeaveListComponent,
    AddLeaveComponent,
    UpdateLeaveComponent,
    ShowLeaveDetailsComponent,
    NotificationListComponent,
    NotificationDetailsComponent,
    ReportListComponent,
    ReportDetailsComponent,
    AlertComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgOptimizedImage,
    CommonModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  exports: [
    SideNavComponent,
    FooterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
