import { Employee } from "./employee";
import {Project} from "./project";

export class Report {
  id: number;
  employee?: Employee; // Optional reference to Employee model
  project?: Project;
  generatedDate: string; // ISO 8601 format (e.g., "2024-07-18")
  totalHoursWorked: number;
  averagePerformance: number;
  performanceMeasure!: 'EXCELLENT' | 'GOOD' | 'MEDIUM' | 'POOR'; // Enum values
  completionTimeVariance: number;
  efficiency: number;
  numberOfLeaves: number;
  averageDaysPerLeave: number;
  taskLengthInHours: number | null;

  constructor() {
    this.id = 0;
    this.project = undefined;
    this.employee = undefined;
    this.generatedDate = "";
    this.totalHoursWorked = 0;
    this.averagePerformance = 0;
    this.completionTimeVariance = 0;
    this.efficiency = 0;
    this.numberOfLeaves = 0;
    this.averageDaysPerLeave = 0;
    this.taskLengthInHours = null;
  }
}
