import {Employee} from "./employee";
import {NotificationSeenBy} from "./notification-seen-by";

export interface Notification {
  id: number;
  title: string;
  description: string;
  recipients: Employee[]; // List of Employee models
  seenBy: NotificationSeenBy[]; // List of NotificationSeenBy models
}
