import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';
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
    private appService: AppService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
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

  createUser(paymentData: any): void {
    this.isLoading = true;
    this.appService.createUser(this.formUser.get('user')?.value).subscribe((response) => {
      if(paymentData?.pix_key) {
        const data = { auth: response.token, body: { numero_documento: paymentData.pix_key }};
        this.createInvoiceByPix(data)
      } else {
        const data = {
          auth: response.token,
          body: {
            ...paymentData,
            first_name: this.formUser?.get('user')?.get('first_name')?.value,
            last_name: this.formUser?.get('user')?.get('last_name')?.value,
          }
        };
        this.createInvoiceByCreditCard(data);
      }
    }, error => {
      this.isLoading = false;
      this.error();
    })
  }

  createInvoiceByCreditCard(data: any): void {
    Iugu.setAccountID("6743ADF556B84F229AE40D63AC8FE78A");
    Iugu.setTestMode(true);
    const cc = this.createCreditCardObject(data.body);
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

    }, error => {
      this.isLoading = false;
      this.error();
    })
  }

  error(): void {
    this.notificationService.notify('Ocorreu um erro ao criar o pagamento. Por favor, entre em contato com o suporte!');
  }
}

//   {
//     "user": {
//         "name": "Wellington Teixeira",
//         "email": "wellington1@gmail.com",
//         "phone_number": "86981862803",
//         "updated_at": "2023-11-18T02:00:10.000000Z",
//         "created_at": "2023-11-18T02:00:08.000000Z",
//         "id": 18,
//         "iugu_user_id": "F382FECC56EA44AA96BFE3AFC62FCC4D"
//     },
//     "token": "135|8r0PKASmlSAGJvNLfsiF6t1DMJ99jBYswsTA2t6p",
//     "token_type": "Bearer"
// }
