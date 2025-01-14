// notification.component.ts
import { Component, OnInit } from '@angular/core';
import { Notification, NotificationService } from '../notification.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  notification: Notification | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.getNotification().subscribe((notification: Notification | null) => {
      this.notification = notification;
    });
  }

  onClose() {
    this.notificationService.clear();
  }
}
