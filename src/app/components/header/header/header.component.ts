import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  expanded: boolean = false;
  user: any;
  promotionRouter: string = '/promotion';
  showPromotionSubMenu: boolean = false;

  @Input() hideOptions: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if(user) {
      this.user = JSON.parse(user);

      if(this.user?.assinatura === 'ativa') {
        this.promotionRouter = '/promotion-logged-result';
      }
    }
  }

  hiddenMenu(): void {
    const menu = document.getElementById('menu');
    menu?.classList.remove('expanded');
    this.expanded = false;
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
