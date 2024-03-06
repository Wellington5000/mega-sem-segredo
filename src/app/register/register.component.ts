import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  formUser: FormGroup = new FormGroup({
    user: new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_number: new FormControl('', [Validators.required]),
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
    //this.checkPixWasPaid("814|f3EIofmmIRM4GwYvPUD7SRLrw1MLA7p4dA1iH2Pi");

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

  nextStepByPayment(paymentType: string): void {
    this.step = (paymentType === 'pix') ? 'pix-data' : 'credit-card-data';
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
    this.appService.createUser(user).subscribe((response) => {      
      const obj = { body: data, auth: response?.token }
      
      if(data?.pix_key) {
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
    Iugu.setAccountID("6743ADF556B84F229AE40D63AC8FE78A");
    Iugu.setTestMode(true);
    const cc = this.createCreditCardObject( this.originPayment ? data : data.body);
    const self = this;

    Iugu.createPaymentToken(cc, function(response: any) {
      if (response.errors) {
        self.isLoading = false;
        self.notificationService.notify('Erro ao criar pagamento. Por favor, revise os dados informados e tente novamente');
      } else {
        self.createCardPayment({ auth: data.auth, body: { token: response.id }});
      }
    });
  }

  createCardPayment(data: any): void {
    this.appService.createPaymentByCreditCard(data).subscribe((response) => {
      this.isLoading = false;
      this.step = 'success';
    }, error => {
      this.isLoading = false;
      this.error();
    })
  }

  createInvoiceByPix(paymentData: any): void {
    this.appService.createPaymentByPix(paymentData).subscribe((response) => {
      this.isLoading = false;
      this.pixData = { qrcode: response?.pix?.qrcode, qrcode_text: response?.pix?.qrcode_text };
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