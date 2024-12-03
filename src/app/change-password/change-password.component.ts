import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';

const REQUEST_PASSWORD_KEY = 'request-password-key';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  disabledButton: boolean = false;
  hasError: boolean = false;
  isRecovery: boolean = false;
  successChange: boolean = false;
  params: string[] = ['change', 'recovery'];
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private router: Router,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    const param = this.activatedRoute.snapshot.params['type'];
    const requestedPassword = localStorage.getItem(REQUEST_PASSWORD_KEY);

    if(!this.params.includes(param)) {
      this.redirect();
    } else {
      this.isRecovery = param === 'recovery';
    }

    if(requestedPassword) {
      this.disabledButton = true;
    }

    this.startTimeOut();
  }

  redirect(): void {
    this.router.navigateByUrl('/home');
  }

  changePassword(): void {
    this.appService.recoveryPassword({ email: this.email.value }).subscribe({ 
      next: (response) => {
        this.successChange = true;
        this.wasRequestedPassword();
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao recuperar senha. Por favor, tente novamente!');

        if(error?.error?.message === 'Por favor espere antes de tentar novamente.') {
          this.wasRequestedPassword();
        } else {
          this.clearItem();
        }
      }
    })
  }

  wasRequestedPassword(): void {
    localStorage.setItem(REQUEST_PASSWORD_KEY, 'true');
    this.disabledButton = true;
  }

  startTimeOut(): void {
    setTimeout(() => {
      this.clearItem();
    }, 600000);
  }

  clearItem(): void {
    localStorage.removeItem(REQUEST_PASSWORD_KEY);
    this.disabledButton = false;
  }
}
