import { Component, HostListener, OnInit } from '@angular/core';
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
  showPromotionSubMenu: boolean = false;

  constructor(
    private appService: AppService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    //this.getCredits();
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

  togglePromotionSubMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showPromotionSubMenu = !this.showPromotionSubMenu;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.showPromotionSubMenu) {
      this.showPromotionSubMenu = false;
    }
  }
}
