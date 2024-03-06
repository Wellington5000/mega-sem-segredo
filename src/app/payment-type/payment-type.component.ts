import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss']
})
export class PaymentTypeComponent implements OnInit {
  selectedPaymentMethod: FormControl = new FormControl('credit_card');

  @Output() nextStep = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  next(): void {
    this.nextStep.emit(this.selectedPaymentMethod.value);
  }
}
