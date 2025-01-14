// notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type NotificationType = 'success' | 'error' | 'warning';

export interface Notification {
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);

  notify(message: string) {
    const notification: Notification = { message: message, type: 'error' };
    this.notificationSubject.next(notification);
    this.clear();
  }

  success(message: string): void {
    const notification: Notification = { message: message, type: 'success' };
    this.notificationSubject.next(notification);
    this.clear();
  }

  clear() {
    setTimeout(() => {
      this.notificationSubject.next(null);
    }, 50000);
  }

  getNotification() {
    return this.notificationSubject.asObservable();
  }
}
