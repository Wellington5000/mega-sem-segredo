import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

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
