import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';

type Step = 'email' | 'password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hasError: boolean = false;
  showPassword: boolean = false;
  step: Step = 'email';
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(
    private router: Router,
    private appService: AppService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.createCookie();
  }

  setStep(step: Step): void {
    this.step = step;
  }

  createCookie(): void {
    this.appService.createCookie().subscribe({
      next: (response) => {
      },
      error: (error) => {
      }
    })
  }

  checkEmail(step: Step): void {
    if(this.email.valid) {
      this.appService.checkEmail({ email: this.email.value }).subscribe({
        next: (response) => {
          if(response?.email) {
            this.setStep(step);
          } else {
            this.router.navigateByUrl('/register/web');
          }
        }
      })
    }
  }

  login(): void {
    const deviceName = this.email.value?.split('@');
    this.appService.login({
      email: this.email.value,
      password: this.password.value,
      device_name: deviceName[0],
      device_id: deviceName[0]
    }).subscribe({
      next: (response) => {
        localStorage.setItem('access-token', response?.token);
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Senha incorreta!');
      }
    })
  }

  onSignIn(googleUser: any) {
    // Profile data from the Google User object
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }
}
