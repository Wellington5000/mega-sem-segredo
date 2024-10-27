import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../utils/notification/notification.service';
import { UserResponse } from '../models/user-response';
import { Utils } from '../utils/utils';
declare const Iugu: any;
declare const mp: any;

@Component({
  selector: 'app-credit-card-data',
  templateUrl: './credit-card-data.component.html',
  styleUrls: ['./credit-card-data.component.scss']
})
export class CreditCardDataComponent implements OnInit {
  cardForm: any;
  user!: UserResponse;
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

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.user = Utils.getUser();
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

  next(cardData: any): void {
    this.nextStep.emit(cardData);
  }

  initForm(): void {
    this.cardForm = mp.cardForm({
      amount: "240",
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Número do cartão",
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/AA",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "CVV",
        },
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Ex: Maria da Silva",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco emissor",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Parcelas",
        },
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "CPF",
        },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) return console.warn("Form Mounted handling error: ", error);
        },
        onSubmit: (event: any) => {
          event.preventDefault();
          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = this.cardForm.getCardFormData();

          this.next({
            "payer": {
              "email": this.user?.user?.email,
              "identification": {
                "type": identificationType,
                "number": identificationNumber
              }
            },
            "issuer_id": issuer_id,
            "payment_method_id": payment_method_id,
            "token": token,
            "transaction_amount": amount,
            "produto": 5,
            "descricao": "Assinatura"
          })
        },
        onError: (error: any) => {
          this.notificationService.notify('Ocorreu um erro ao processar o pagamento, por favor, tente novamente!')
        }
      },
    });

  }

  ngOnDestroy(): void {
    this.cardForm.unmount();
  }
}
