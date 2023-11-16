import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-credit-card-data',
  templateUrl: './credit-card-data.component.html',
  styleUrls: ['./credit-card-data.component.scss']
})
export class CreditCardDataComponent implements OnInit {
  hasError: boolean = false;

  formCard: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    number: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required]),
  })

  constructor() { }

  ngOnInit(): void {
  }

  next(): void {
    if(this.formCard.valid) {

    } else {
      this.hasError = true;
    }
  }
}
