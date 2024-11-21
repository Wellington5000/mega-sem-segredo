import { Component, ElementRef, HostListener, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-section-5',
  templateUrl: './section-5.component.html',
  styleUrls: ['./section-5.component.scss']
})
export class Section5Component {
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;
  private scrollPosition = 0;
  private cardWidth = 742;
  screenWidth: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.updateScreenSize();
    this.screenWidth = this.isBrowser() ? window.innerWidth : 0;
  }

  scrollLeft(): void {
    this.scrollPosition = Math.max(this.scrollPosition - this.cardWidth, 0);
    this.updateScroll();
  }

  scrollRight(): void {
    const maxScroll = this.carousel.nativeElement.scrollWidth - this.carousel.nativeElement.clientWidth;
    this.scrollPosition = Math.min(this.scrollPosition + this.cardWidth, maxScroll);
    this.updateScroll();
  }

  updateScroll(): void {
    if (this.isBrowser()) {
      this.carousel.nativeElement.style.transform = `translateX(-${this.scrollPosition}px)`;
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
        this.cardWidth = 305;
      } else {
        this.cardWidth = 742
      }
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
