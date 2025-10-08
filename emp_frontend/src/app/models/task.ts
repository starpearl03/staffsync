import {Employee} from "./employee";
import {Project} from "./project";

export interface Task {
  id: number;
  title: string;
  description: string;
  durationInHours: number | null;
  assignedDate: string; // ISO 8601 format
  finishedDate: string | null; // ISO 8601 format
  deadlineDate: string | null; // ISO 8601 format
  status: string;
  employee: Employee; // Reference to Employee model
  project: Project; // Reference to Project model
}
