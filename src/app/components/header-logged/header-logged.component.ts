import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { NotificationService } from 'src/app/utils/notification/notification.service';

@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.scss']
})
export class HeaderLoggedComponent implements OnInit {
  expanded: boolean = false;
  credits:  number = 0;

  constructor(
    private appService: AppService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getCredits();
  }

  hiddenMenu(): void {
    const menu = document.getElementById('menu');
    menu?.classList.remove('expanded');
    this.expanded = false;
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
}
