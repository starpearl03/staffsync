// alert.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<{ message: string | null, type: 'info' | 'success' | 'warning' | 'danger' }>({ message: null, type: 'info' });

  alert$ = this.alertSubject.asObservable();

  setAlert(message: string, type: 'info' | 'success' | 'warning' | 'danger') {
    this.alertSubject.next({ message, type });
  }

  clearAlert() {
    this.alertSubject.next({ message: null, type: 'info' });
  }
}
