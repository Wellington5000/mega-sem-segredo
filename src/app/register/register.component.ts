import { trigger, transition, style, animate, AUTO_STYLE, state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  // animations: [
  //   trigger('enterOut', [
  //     transition(':enter', [
  //       style({ position: AUTO_STYLE, right: AUTO_STYLE, display: AUTO_STYLE }),
  //       animate(300, style({ right: '0' })),
  //     ]),
  //     transition(':leave', [
  //       animate(300, style({ marginLeft: '-700px', display: 'none' })),
  //     ]),
  //   ]),
  //   // trigger('enterOut', [
  //   //   state('false', style({ marginLeft: '-700px', display: 'none' })),
  //   //   state('true', style({ position: AUTO_STYLE, right: AUTO_STYLE, display: AUTO_STYLE })),
  //   //   transition('false => true', animate(300 + 'ms ease-in')),
  //   //   transition('true => false', animate(300 + 'ms ease-out'))
  //   // ]),
  // ]
})
export class RegisterComponent implements OnInit {
  hasError: boolean = false;
  showPassword: boolean = false;
  step: string = 'user';
  showConfirmPassword: boolean = false;

  formUser: FormGroup = new FormGroup({
    user: new FormGroup({
      first_name: new FormControl('Wellington', [Validators.required]),
      last_name: new FormControl('Teixeira', [Validators.required]),
      email: new FormControl('wellington@gmail.com', [Validators.required, Validators.email]),
      phone_number: new FormControl(86981862803, [Validators.required]),
      password: new FormControl('teste123', [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('teste123', [Validators.required, Validators.minLength(8)]),
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
}
