import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentErrors } from '../models/payment-errors';
declare const Iugu: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  pixData: any = { qrcode: 'https://qr.iugu.com/public/v1/qr_codes/image/0BA7928122F647BF829EE33AB970F69B', qrcode_text: '' };;
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

  //"820|YCDkxaXS5nLfvorHkhQkeLFwO4v0TcLqi6qcjeI4"
  //iVBORw0KGgoAAAANSUhEUgAABRQAAAUUAQAAAACGnaNFAAANZklEQVR4Xu3ZTXbcOBJFYWrkZXCpzKXmEmrokdCOiMdAAEy5fNRwH1F978Qwfj9qZFVt7cv3zzbPfL0wrgnjmjCuCeOaMK4J45owrgnjmjCuCeOaMK4J45owrgnjmjCuCeOaMK4J45owrgnjmjCuCeOaMK4J45owrgnjmjCuCeOaMK4J45owrgnjmjCuCeOaMK4J45owrgnjmjCuCeOaMK4J45owrgnjmjCuCeOaMK4J45owrul

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
      this.step = 'pix-data';
      this.coupon = payment?.coupon;
    } else {
      this.step = 'credit-card-data';
      this.coupon = '';
    }
  }

  createCreditCardObject(creditData: any): any {
    const month = creditData.date.substring(0, 2); // '12'
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

    if(data.document_number) {
      data.email = this.formUser.get('user')?.get('email')?.value;
    } else {
      data.payer.email = this.formUser.get('user')?.get('email')?.value;
    }

    if(this.coupon) {
      data.cupom = this.coupon;
    }

    this.appService.createUser(user).subscribe((response) => {
      const obj = { body: data, auth: response?.token }

      if(data?.document_number) {
        this.createInvoiceByPix(obj);
      } else {
        this.createInvoiceByCreditCard(obj)
      }
    }, error => {
      this.isLoading = false;
      const emailError = error?.error?.errors?.email;
      this.error(emailError && emailError?.length > 0 ? emailError[0] : null );
    })
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

  error(msg?: string): void {
    this.notificationService.notify(msg || 'Ocorreu um erro ao criar o pagamento. Por favor, entre em contato com o suporte!');
  }
}
