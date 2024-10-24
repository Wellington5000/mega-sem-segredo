import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  expanded: boolean = false;
  user: any;
  promotionRouter: string = '/promotion';

  @Input() hideOptions: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if(user) {
      this.user = JSON.parse(user);

      if(this.user?.assinatura === 'ativa') {
        this.promotionRouter = '/promotion-result';
      }
    }
  }

  hiddenMenu(): void {
    const menu = document.getElementById('menu');
    menu?.classList.remove('expanded');
    this.expanded = false;
  }
}
