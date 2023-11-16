import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss']
})
export class PaymentTypeComponent implements OnInit {
  selectedPaymentMethod: string = 'credit_card';

  @Output() nextStep = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  next(): void {
    this.nextStep.emit(this.selectedPaymentMethod);
  }
}
