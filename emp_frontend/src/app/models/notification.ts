import {NotificationSeenBy} from "./notification-seen-by";
import {Employee} from "./employee";

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
  }

  isSeen(employeeId: number): boolean {
    for (const seen of this.seenBy) {
      if (seen.employee.id === employeeId) {
        return seen.isSeen;
      }
    }
    return false;
  }

  getFormattedDescription(): { message: string, fromDate: string, toDate: string } {
    // Example description format:
    // "Leave has been accepted for employee: John Doe From: 2024-07-17 To: 2024-07-20"
    const parts = this.description.split('From:');
    if (parts.length > 1) {
      const message = parts[0].trim();
      const dateParts = parts[1].split('To:');
      const fromDate = dateParts[0].trim();
      const toDate = dateParts[1]?.trim() || '';

      return { message, fromDate, toDate };
    }

    return { message: this.description, fromDate: '', toDate: '' };
  }
}
