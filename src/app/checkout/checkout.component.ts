import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentErrors } from '../models/payment-errors';

declare const Iugu: any;

interface PixData {
  copia_cola: string;
  img_qrcode: string;
  transaction_amount: number;
  pagamento: number;
  error: boolean;
  message: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  hasAcceptedTerms: FormControl = new FormControl(false);
  hasError: boolean = false;
  step: string = 'user';
  origin: string = 'web';
  originPayment: boolean = false;
  isPixPayment: boolean = false;
  currentUserCoupon: string = '';
  pixData: PixData = {
    copia_cola: '',
    img_qrcode: '',
    transaction_amount: 0,
    pagamento: 0,
    error: false,
    message: ''
  };

  selectedPaymentMethod: FormControl = new FormControl('credit_card');

  formUser: FormGroup = new FormGroup({
    user: new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  })

  constructor(
    private router: Router,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.origin = this.activatedRoute.snapshot.params['origin'];

    if(this.router.url === '/payment-methods') {
      this.step = 'payment-type';
      this.originPayment = true;
      this.origin = 'app';
    }
  }

  nextStepByPayment(payment: any): void {
    if(this.formUser.valid) {
      if(payment === 'pix') {
        this.step = 'pix-data';
      } else {
        this.step = 'credit-card-data';
      }
    } else {
      this.hasError = true;
    }
  }

  createCreditCardObject(creditData: any): any {
    const month = creditData.date.substring(0, 2);
    const year = creditData.date.substring(2);
    return Iugu.CreditCard(
      creditData.number,
      month,
      year,
      this.formUser.get('user')?.get('first_name')?.value,
      this.formUser.get('user')?.get('last_name')?.value,
      creditData.cvv
    );
  }

  createUser(data: any): void {
    const user = { ...this.formUser.get('user')?.value, origin: this.origin };

    this.appService.createUserWithoutPassword(user).subscribe((response) => {
      localStorage.setItem('access-token', response?.token);
      localStorage.setItem('user', JSON.stringify(response));
      
      if(this.selectedPaymentMethod.value === 'pix') {
        this.createInvoiceByPix(data);
      } else {
        this.createInvoiceByCreditCard(data);
      }

    }, error => {
      const emailError = error?.error?.errors?.email;
      this.error(emailError && emailError?.length > 0 ? emailError[0] : null );
    })
  }

  createInvoiceByCreditCard(data: any): void {
    this.createCardPayment({ auth: data.token, body: data });
  }

  createCardPayment(data: any): void {
    this.appService.createPaymentByCreditCard(data).subscribe((response) => {
      if(response.status !== 'approved') {
        const error = PaymentErrors.find((e) => e.error === response.status_detail);
        this.error(error?.message || '');
      } else {
        this.step = 'success';
      }
    }, error => {
      this.error();
    })
  }

  createInvoiceByPix(paymentData: any): void {
    this.appService.createPaymentByPix(paymentData).subscribe((response: PixData) => {
      this.pixData = response;
      this.step = 'pix-payment';
      this.checkPixWasPaid(response?.pagamento);
    }, error => {
      this.error();
    })
  }

  checkPixWasPaid(id: number): void {
    this.appService.checkPaymentByPix(id).subscribe({
      next: (response) => {
        if(response?.paga) {
          this.isPixPayment = true;
          this.currentUserCoupon = response?.cupom;
          this.step = 'success';
        } else {
          setTimeout(() => {
            this.checkPixWasPaid(id);
          }, 5000);
        }
      },
      error: (error) => {
        this.error('Erro ao verificar se o pix foi pago');
      }
    })
  }

  error(msg?: string): void {
    this.notificationService.notify(msg || 'Ocorreu um erro ao criar o pagamento. Por favor, entre em contato com o suporte!');
  }
}
