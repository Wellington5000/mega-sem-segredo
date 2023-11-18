// notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<string | null>(null);

  notify(message: string) {
    this.notificationSubject.next(message);

    setTimeout(() => {
      this.clear();
    }, 5000);
  }

  clear() {
    this.notificationSubject.next(null);
  }

  getNotification() {
    return this.notificationSubject.asObservable();
  }
}
