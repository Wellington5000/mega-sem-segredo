import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  expanded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  
  hiddenMenu(): void {
    const menu = document.getElementById('menu');
    menu?.classList.remove('expanded');
    this.expanded = false;
  }
}
