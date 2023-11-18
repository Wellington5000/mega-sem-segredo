import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';

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
      first_name: new FormControl('Wellington', [Validators.required]),
      last_name: new FormControl('Teixeira', [Validators.required]),
      email: new FormControl('wellington3@gmail.com', [Validators.required, Validators.email]),
      phone_number: new FormControl('86981862803', [Validators.required]),
      password: new FormControl('teste123', [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('teste123', [Validators.required, Validators.minLength(8)]),
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

  createUser(paymentData: any): void {
    this.isLoading = true;
    this.appService.createUser(this.formUser.get('user')?.value).subscribe((response) => {
      const data = { token: response?.token, body: paymentData };

      (paymentData?.pix_key) ?
        this.createInvoiceByPix(data) :
        this.createInvoiceByCreditCard(data);
    }, error => {
      this.isLoading = false;
      this.error();
    })
  }

  createInvoiceByCreditCard(paymentData: any): void {
    this.appService.createPaymentByCreditCard(paymentData).subscribe((response) => {
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
      this.pixData = response;
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
