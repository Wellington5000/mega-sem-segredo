import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-use-terms',
  templateUrl: './use-terms.component.html',
  styleUrls: ['./use-terms.component.scss']
})
export class UseTermsComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }
}
