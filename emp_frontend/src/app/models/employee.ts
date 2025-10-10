import {User} from "./user";

export class Employee extends User{
  firstname: string;
  lastname: string;
  salary: number;
  department: string;
  designation: string;
  joiningDate: string; // ISO 8601 format (e.g., "2024-07-18")



  constructor() {
    super();
    this.firstname = "";
    this.lastname = "";
    this.salary = 0;
    this.department = "";
    this.designation = "";
    this.joiningDate = "";
  }

}
