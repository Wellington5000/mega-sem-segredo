import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../utils/notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { PaymentErrors } from '../models/payment-errors';

type Step = null | 'payment' | 'credit_card' | 'pix' | 'success' | 'pix-payment';

interface PixData {
  qrcode: string;
  qrcode_text: string;
}

@Component({
  selector: 'app-buy-credit',
  templateUrl: './buy-credit.component.html',
  styleUrls: ['./buy-credit.component.scss']
})
export class BuyCreditComponent implements OnInit {
  step: Step = null;
  hasError: boolean = false;
  value: FormControl = new FormControl('', [Validators.required, Validators.min(15)]);

  selectedPaymentMethod: FormControl = new FormControl('credit_card');
  couponIsValid: boolean = false;
  coupon: FormControl = new FormControl('', Validators.minLength(4));

  numberTextError: string = '';
  dateTextError: string = '';
  cvvTextError: string = '';

  isLoading: boolean = false;
  pixData: any = { qrcode: 'https://qr.iugu.com/public/v1/qr_codes/image/0BA7928122F647BF829EE33AB970F69B', qrcode_text: '' };;
  formPix: FormControl = new FormControl('', [Validators.required]);
  isPixPayment: boolean = false;
  currentUserCoupon: string = '';

  isCopy: boolean = false;
  data: PixData = { qrcode: 'https://qr.iugu.com/public/v1/qr_codes/image/0BA7928122F647BF829EE33AB970F69B', qrcode_text: '' };

  formCard: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    number: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required]),
  })

  constructor(
    private router: Router,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  setStep(step: Step): void {
    this.step = step;
  }

  createInvoiceByCreditCard(data: any): void {
    this.createCardPayment({ auth: data.auth, body: data.body });
  }

  createCardPayment(data: any): void {
    this.appService.createPaymentByCreditCard(data).subscribe((response) => {
      this.isLoading = false;

      if(response.status !== 'approved') {
        const error = PaymentErrors.find((e) => e.error === response.status_detail);
        this.error(error?.message || '');
      } else {
        this.step = 'success';
      }
    }, error => {
      this.isLoading = false;
      this.error();
    })
  }

  error(msg?: string): void {
    this.notificationService.notify(msg || 'Ocorreu um erro ao criar o pagamento. Por favor, entre em contato com o suporte!');
  }

  next(): void {
    if(this.formPix.valid) {
      this.createInvoiceByPix({ document_number: this.formPix.value, document_type: 'CPF', valor: 180 });
    } else {
      this.hasError = true;
    }
  }

  createInvoiceByPix(paymentData: any): void {
    this.appService.createPaymentByPix(paymentData).subscribe((response) => {
      this.isLoading = false;
      this.pixData = { qrcode: response?.img_qrcode, qrcode_text: response?.copia_cola };
      this.step = 'pix-payment';
      this.checkPixWasPaid(paymentData?.auth);
    }, error => {
      this.isLoading = false;
      this.error();
    })
  }

  checkPixWasPaid(token: string): void {
    this.appService.checkPaymentByPix({ auth: token }).subscribe({
      next: (response) => {
        if(response?.paga) {
          this.isPixPayment = true;
          this.currentUserCoupon = response?.cupom;
          this.step = 'success';
        } else {
          setTimeout(() => {
            this.checkPixWasPaid(token);
          }, 5000);
        }
      },
      error: (error) => {
        this.error('Erro ao verificar se o pix foi pago');
      }
    })
  }

  copyText() {
    navigator.clipboard.writeText(this.data.qrcode_text).then(() => {
      this.isCopy = true;
      setTimeout(() => this.isCopy = false, 3000);
    }).catch(err => {
      this.isCopy = false;
    });
  }
}
