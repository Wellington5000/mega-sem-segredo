import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mega-sem-segredo';

  @ViewChild('about') aboutSection: ElementRef | undefined;

  constructor(private viewportScroller: ViewportScroller) {}

  scrollToAbout() {
    console.log('a')
    this.viewportScroller.scrollToAnchor('about');
  }
}
