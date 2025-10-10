import {Employee} from "./employee";
import {Project} from "./project";

export class Task {
  id: number;
  title: string;
  description: string;
  durationInHours: number | null;
  assignedDate: string; // ISO 8601 format
  finishedDate: string | null; // ISO 8601 format
  deadlineDate: string | null; // ISO 8601 format
  status: string;
  employee!: Employee; // Reference to Employee model
  project!: Project; // Reference to Project model


  constructor() {
    this.id = 0;
    this.title = "";
    this.description = "";
    this.durationInHours = 0;
    this.assignedDate = "";
    this.finishedDate = "";
    this.deadlineDate = "";
    this.status = "";
    //this.employee = "";
    //this.project = "";
  }
}
