import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/empolyee/employee-list/employee-list.component';
import { AddEmployeeComponent } from './pages/empolyee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './pages/empolyee/update-employee/update-employee.component';
import { ShowDetailsComponent } from './pages/empolyee/show-details/show-details.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import {LoginComponent} from "./pages/authentication/login/login.component";
import {RegisterComponent} from "./pages/authentication/register/register.component";



const routes: Routes = [

  // Employee routes
  {path:"fetch-all-employee",component: EmployeeListComponent},
  {path:"add-employee", component: AddEmployeeComponent},
  {path:'update-employee/:id',component:UpdateEmployeeComponent},
  {path:'details-employee/:id',component:ShowDetailsComponent},

  // Admin routes
  {path:'home',component:HomeComponent},

  // Project routes
  // Task routes
  // Leave routes
  // Report routes
  // Notification routes

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
