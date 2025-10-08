import {Employee} from "./employee";

export interface Leave {
  id: number;
  description: string;
  employee: Employee; // Reference to Employee model
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  status: string;
}
