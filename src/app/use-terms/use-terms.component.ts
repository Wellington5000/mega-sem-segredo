import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-use-terms',
  templateUrl: './use-terms.component.html',
  styleUrls: ['./use-terms.component.scss']
})
export class UseTermsComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    const state = this.location.getState() as Record<string, any>;
    if (state && state['navigationId'] === 1) {
      this.router.navigate(['/']);
    } else {
      this.location.back();
    }
  }
}
