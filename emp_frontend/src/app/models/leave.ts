import {Employee} from "./employee";

export class Leave {
  id: number;
  description: string;
  employee!: Employee; // Reference to Employee model
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  status: string;


  constructor() {
    this.id = 0;
    this.description = "";
    //this.employee = "";
    this.startDate = "";
    this.endDate = "";
    this.status = "";
  }
}
