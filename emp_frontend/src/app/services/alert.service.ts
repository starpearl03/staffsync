import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<{ message: string | null, type: 'info' | 'success' | 'warning' | 'danger' }>({ message: null, type: 'info' });

  alert$ = this.alertSubject.asObservable();

  setAlert(message: string, type: 'info' | 'success' | 'warning' | 'danger', duration: number = 3000) {
    this.alertSubject.next({ message, type });

    // Automatically clear the alert after specified duration (default: 3000ms)
    timer(duration).subscribe(() => {
      this.clearAlert();
    });
  }

  clearAlert() {
    this.alertSubject.next({ message: null, type: 'info' });
  }
}
