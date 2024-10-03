import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-buy-credit',
  templateUrl: './buy-credit.component.html',
  styleUrls: ['./buy-credit.component.scss']
})
export class BuyCreditComponent implements OnInit {
  hasError: boolean = false;
  value: FormControl = new FormControl('', [Validators.required, Validators.min(15)]);

  constructor() { }

  ngOnInit(): void {
  }

}
