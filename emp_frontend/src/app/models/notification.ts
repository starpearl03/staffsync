import {Employee} from "./employee";
import {NotificationSeenBy} from "./notification-seen-by";

export class Notification {
  id: number;
  title: string;
  description: string;
  recipients!: Employee[]; // List of Employee models
  seenBy!: NotificationSeenBy[]; // List of NotificationSeenBy models


  constructor() {
    this.id = 0;
    this.title = "";
    this.description = "";
    //this.recipients = "";
    //this.seenBy = "";
  }
}
