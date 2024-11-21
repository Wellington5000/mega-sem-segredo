import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-section-4',
  templateUrl: './section-4.component.html',
  styleUrls: ['./section-4.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('500ms ease-in', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0, transform: 'translateX(-100%)' }))
      ]),
    ])
  ]
})
export class Section4Component {
  index: number = 0;
  isMobile: boolean = false;

  @ViewChild('carousel', { static: true }) carousel!: ElementRef;
  @ViewChild('carousel2', { static: true }) carousel2!: ElementRef;
  private scrollPosition = 0;
  private cardWidth = 400;
  screenWidth: number;

  receipts = [
    { index: 0, name: 'comprovante-2' },
    { index: 1, name: 'comprovante-3' },
    { index: 2, name: 'comprovante-4' },
    { index: 3, name: 'comprovante-5' },
    { index: 4, name: 'comprovante-6' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.updateScreenSize();
    this.screenWidth = this.isBrowser() ? window.innerWidth : 0;
  }

  next(): void {
    if(this.index === this.receipts.length - 1) {
      this.index = 0;
    } else {
      this.index += 1;
    }
  }

  previus(): void {
    if(this.index === 0) {
      this.index = this.receipts.length - 1;
    } else {
      this.index -= 1;
    }
  }

  getImage(): string {
    const receipt = this.receipts.find((receipt) => receipt.index === this.index);
    return receipt?.name || '';
  }

  scrollLeft(): void {
    this.scrollPosition = Math.max(this.scrollPosition - this.cardWidth, 0);
    this.updateScroll();
  }

  scrollRight(): void {
    const carousel = this.isMobile ? this.carousel2 : this.carousel;
    const maxScroll = carousel.nativeElement.scrollWidth - carousel.nativeElement.clientWidth;
    this.scrollPosition = Math.min(this.scrollPosition + this.cardWidth, maxScroll);
    this.updateScroll();
  }

  updateScroll(): void {
    if (this.isBrowser()) {
      const carousel = this.isMobile ? this.carousel2 : this.carousel;
      carousel.nativeElement.style.transform = `translateX(-${this.scrollPosition}px)`;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateScreenSize();
  }

  updateScreenSize(): void {
    if (this.isBrowser()) {
      this.screenWidth = window.innerWidth;

      if (this.screenWidth <= 1040) {
        this.isMobile = true;
        this.cardWidth = 285;
      } else {
        this.isMobile = false;
        this.cardWidth = 557;
      }
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
