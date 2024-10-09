import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {
  hasPlan: boolean = false;
  user: any;
  credits:  number = 0;
  lastResults: any[] = [];

  constructor(
    private appService: AppService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getCredits();
    this.getLastResults();

    const user = localStorage.getItem('user');
    if(user) {
      this.user = JSON.parse(user);
    }
  }

  getCredits(): void {
    this.appService.getUserCredit().subscribe({
      next: (response) => {
        this.credits = response?.saldo;
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao carregar informações dos créditos');
      }
    })
  }

  getLastResults(): void {
    this.appService.getLasResults().subscribe({
      next: (response) => {
        this.lastResults = response;
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao buscar os últimos resultados');
      }
    })
  }
}
