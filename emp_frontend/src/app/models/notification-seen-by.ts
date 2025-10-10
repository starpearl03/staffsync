import {Employee} from "./employee";

export class NotificationSeenBy {
  id: number;
  notification!: Notification; // Reference to Notification model
  employee!: Employee; // Reference to Employee model
  isSeen!: boolean;


  constructor() {
    this.id = 0;
    //this.notification = notification;
    //this.employee = "";
    //this.isSeen = "";
  }
}
