import {Employee} from "./employee";

export interface NotificationSeenBy {
  id: number;
  notification: Notification; // Reference to Notification model
  employee: Employee; // Reference to Employee model
  isSeen: boolean;
}
