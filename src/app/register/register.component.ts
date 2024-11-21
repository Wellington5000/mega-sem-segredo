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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  keepChecking: boolean = true; 
  timeOut: any;
  hasAcceptedTerms: FormControl = new FormControl(false);
  hasError: boolean = false;
  showPassword: boolean = false;
  step: string = 'user';
  showConfirmPassword: boolean = false;
  isLoading: boolean = false;
  origin: string = 'web';
  originPayment: boolean = false;
  isPixPayment: boolean = false;
  coupon: string = '';
  currentUserCoupon: string = '';
  pixData: PixData = {
    copia_cola: '',
    img_qrcode: '',
    transaction_amount: 0,
    pagamento: 0,
    error: false,
    message: ''
  };

  formUser: FormGroup = new FormGroup({
    user: new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_number: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
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

    this.getEmailParam();
  }

  getEmailParam(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const email = params['email'];
      this.formUser.get('user')?.get('email')?.setValue(email);
    });
  }

  checkPasswordIsValid(): boolean {
    const password = this.formUser.get('user.password')?.value;
    const confirmPassword = this.formUser.get('user.password_confirmation')?.value;

    const hasLetterAndNumber = /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password);
    return hasLetterAndNumber && password === confirmPassword;
  }

  nextStep(): void {
    if(this.checkPasswordIsValid() && this.formUser.valid) {
      this.step = 'payment-type';
    } else {
      this.hasError = true;
    }
  }

  nextStepByPayment(payment: any): void {
    if(payment?.payment_type === 'pix') {
      window.location.href = 'https://clkdmg.site/pay/plano-mega-pix';
      // this.step = 'pix-data';
      // this.coupon = payment?.coupon;
    } else {
      window.location.href = 'https://clkdmg.site/pay/plano-mega-cartao';
      // this.step = 'credit-card-data';
      // this.coupon = '';
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
    this.isLoading = true;
    const user = { ...this.formUser.get('user')?.value, origin: this.origin };

    if(!user?.phone_number) {
      delete user.phone_number;
    }

    this.appService.createUser(user).subscribe((response) => {
      localStorage.setItem('access-token', response?.token);
      localStorage.setItem('user', JSON.stringify(response));
      this.router.navigateByUrl('/home');
    }, error => {
      this.isLoading = false;
      const emailError = error?.error?.errors?.email;
      this.error(emailError && emailError?.length > 0 ? emailError[0] : null );
    })
  }

  createInvoiceByCreditCard(data: any): void {
    this.createCardPayment({ auth: data.token, body: data });
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

  createInvoiceByPix(paymentData: any): void {
    this.appService.createPaymentByPix(paymentData).subscribe((response: PixData) => {
      this.isLoading = false;
      this.pixData = response;
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

  ngOnDestroy(): void {
    this.keepChecking = false;
  }
}
