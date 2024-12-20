import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../utils/notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { PaymentErrors } from '../models/payment-errors';
import { HeaderLoggedComponent } from '../components/header-logged/header-logged.component';
import { debounceTime } from 'rxjs';

type Step = null | 'payment' | 'credit_card' | 'pix' | 'success' | 'pix-payment';

interface PixData {
  copia_cola: string;
  img_qrcode: string;
  transaction_amount: number;
  pagamento: number;
  error: boolean;
  message: string;
}


@Component({
  selector: 'app-buy-credit',
  templateUrl: './buy-credit.component.html',
  styleUrls: ['./buy-credit.component.scss']
})
export class BuyCreditComponent implements OnInit {
  step: Step = null;
  credits: number = 0;
  hasError: boolean = false;
  keepChecking: boolean = true; 
  value: FormControl = new FormControl(25, [Validators.required, Validators.min(25)]);

  selectedPaymentMethod: FormControl = new FormControl('credit_card');
  couponIsValid: boolean = false;
  coupon: FormControl = new FormControl('', Validators.minLength(4));

  numberTextError: string = '';
  dateTextError: string = '';
  cvvTextError: string = '';

  isLoading: boolean = false;
  formPix: FormControl = new FormControl('', [Validators.required]);
  isPixPayment: boolean = false;
  currentUserCoupon: string = '';

  isCopy: boolean = false;
  data: PixData = {
    copia_cola: '',
    img_qrcode: '',
    transaction_amount: 0,
    pagamento: 0,
    error: false,
    message: ''
  };

  formCard: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    number: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required]),
  });

  @ViewChild(HeaderLoggedComponent) headerLoggedComponent!: HeaderLoggedComponent;

  constructor(
    private router: Router,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getCredits();
  }

  ngAfterViewInit(): void {
    this.value.valueChanges.pipe(debounceTime(700)).subscribe((value) => {
      this.hasError = !this.isMultipleOf25(Number(value))
    });
  }

  setStep(step: Step): void {
    this.step = step;
  }

  createInvoiceByCreditCard(data: any): void {
    this.createCardPayment({ auth: data.auth, body: data });
  }

  createCardPayment(data: any): void {
    this.appService.createPaymentByCreditCard(data).subscribe((response) => {
      this.isLoading = false;

      if(response.status !== 'approved') {
        const error = PaymentErrors.find((e) => e.error === response.status_detail);
        this.error(error?.message || '');
      } else {
        this.step = 'success';
        this.headerLoggedComponent.getCredits();
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
      this.createInvoiceByPix({ 
        document_number: this.formPix.value, 
        document_type: 'CPF', 
        valor: this.value.value,
        "produto": 4,
        "descricao": "Compra de créditos"
      });
    } else {
      this.hasError = true;
    }
  }

  createInvoiceByPix(paymentData: any): void {
    this.appService.createPaymentByPix(paymentData).subscribe((response: PixData) => {
      this.isLoading = false;
      this.data = response;
      this.step = 'pix-payment';
      this.checkPixWasPaid(response?.pagamento);
    }, error => {
      this.isLoading = false;
      this.error();
    })
  }

  checkPixWasPaid(id: number): void {
    if (!this.keepChecking) return;

    this.appService.checkPaymentByPix(id).subscribe({
      next: (response) => {
        if(response?.paga) {
          this.isPixPayment = true;
          this.currentUserCoupon = response?.cupom;
          this.step = 'success';
          this.headerLoggedComponent.getCredits();
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

  copyText() {
    navigator.clipboard.writeText(this.data.copia_cola).then(() => {
      this.isCopy = true;
      setTimeout(() => this.isCopy = false, 3000);
    }).catch(err => {
      this.isCopy = false;
    });
  }

  getCredits(): void {
    this.appService.getUserCredit().subscribe({
      next: (response) => {
        this.credits = response?.saldo;
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao carregar informações dos créditos');
      }
    })
  }

  isMultipleOf25(value: number): boolean {
    return value % 25 === 0;
  }

  remove(): void {
    const value = Number(this.value.value);

    if(value > 25) {
      this.value.setValue(value - 25);
    }
  }

  add(): void {
    const value = Number(this.value.value) + 25;
    this.value.setValue(value);
  }

  ngOnDestroy(): void {
    this.keepChecking = false;
  }
}
