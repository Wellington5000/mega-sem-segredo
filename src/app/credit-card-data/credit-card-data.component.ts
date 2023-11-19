import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare const Iugu: any;

@Component({
  selector: 'app-credit-card-data',
  templateUrl: './credit-card-data.component.html',
  styleUrls: ['./credit-card-data.component.scss']
})
export class CreditCardDataComponent implements OnInit {
  hasError: boolean = false;
  numberTextError: string = '';
  dateTextError: string = '';
  cvvTextError: string = '';
  @Output() nextStep = new EventEmitter();

  formCard: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    number: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required]),
  })

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.formCard.valueChanges.subscribe(() => {
      this.formCard.get('number')?.clearValidators();
      this.formCard.updateValueAndValidity({ emitEvent: false });
    })

    this.formCard.valueChanges.subscribe(() => {
      this.formCard.get('date')?.clearValidators();
      this.formCard.updateValueAndValidity({ emitEvent: false });
    })

    this.formCard.valueChanges.subscribe(() => {
      this.formCard.get('cvv')?.clearValidators();
      this.formCard.updateValueAndValidity({ emitEvent: false });
    })
  }

  checkCardData(): void {
    if(!Iugu.utils.validateCreditCardNumber(this.formCard.get('number')?.value))  {
      this.hasError = true;
      this.numberTextError = 'Número do cartão inválido';
      this.formCard.get('number')?.setErrors({ wrong: true });
    }

    const date = this.formCard.get('date')?.value.substring(0, 2) + '/' + this.formCard.get('date')?.value.substring(2);
    if(!Iugu.utils.validateExpirationString(date))  {
      this.hasError = true;
      this.dateTextError = 'Data de validade inválida';
      this.formCard.get('date')?.setErrors({ wrong: true });
    }

    const cvv = this.formCard.get('cvv')?.value;
    const brand = Iugu.utils.getBrandByCreditCardNumber(this.formCard.get('number')?.value);
    if(!brand || !Iugu.utils.validateCVV(cvv, brand))  {
      this.hasError = true;
      this.cvvTextError = 'CVV inválido';
      this.formCard.get('cvv')?.setErrors({ wrong: true });
    }
  }

  next(): void {
    this.checkCardData();
    if(this.formCard.valid) {
      this.nextStep.emit(this.formCard.value);
    } else {
      this.hasError = true;
    }
  }
}
