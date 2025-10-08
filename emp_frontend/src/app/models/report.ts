import {Project} from "./project";

export interface Report {
  id: number;
  project: Project; // Reference to Project model
  totalHoursWorked: number;
  averagePerformance: number;
  performanceMeasure: 'EXCELLENT' | 'GOOD' | 'MEDIUM' | 'POOR'; // Enum values
  completionTimeVariance: number;
  efficiency: number;
  numberOfLeaves: number;
  averageDaysPerLeave: number;
  taskLengthInHours: number | null;
}
