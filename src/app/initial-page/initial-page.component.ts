import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {
  hasPlan: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
