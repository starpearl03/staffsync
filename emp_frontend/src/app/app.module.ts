import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EmployeeListComponent } from './pages/empolyee/employee-list/employee-list.component';
import { AddEmployeeComponent } from './pages/empolyee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './pages/empolyee/update-employee/update-employee.component';
import { ShowDetailsComponent } from './pages/empolyee/show-details/show-details.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    ShowDetailsComponent,
    AdminLoginComponent,
    SideNavComponent,
    FooterComponent,
    NotificationComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    HomeComponent,
    NgOptimizedImage
  ],
  providers: [],
  exports: [
    SideNavComponent,
    FooterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
