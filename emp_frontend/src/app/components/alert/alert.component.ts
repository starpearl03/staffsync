import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnChanges {

  @Input() message: string | null = null;
  @Input() type: 'info' | 'success' | 'warning' | 'danger' = 'info'; // You can customize the types

  alertClass: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.setAlertClass();
    }
  }

  private setAlertClass(): void {
    switch (this.type) {
      case 'success':
        this.alertClass = 'alert-success';
        break;
      case 'warning':
        this.alertClass = 'alert-warning';
        break;
      case 'danger':
        this.alertClass = 'alert-danger';
        break;
      default:
        this.alertClass = 'alert-info';
    }
  }
}
