import { trigger, transition, style, animate, AUTO_STYLE, state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hasError: boolean = false;
  showPassword: boolean = false;
  step: string = 'user';
  showConfirmPassword: boolean = false;

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
    private appService: AppService
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
      // this.appService.createUser(this.formUser.get('user')?.value).subscribe((response) => {
      //   console.log(response);
      // })
      this.step = 'payment-type';

    } else {
      this.hasError = true;
    }
  }

  nextStepByPayment(paymentType: string): void {
    this.step = (paymentType === 'pix') ? 'pix-data' : 'credit-card-data';
  }

  createInvoice(paymentData: any): void {
    this.step = 'success';
  }
}
