import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
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

    if(!this.params.includes(param)) {
      this.redirect();
    } else {
      this.isRecovery = param === 'recovery';
    }
  }

  redirect(): void {
    this.router.navigateByUrl('/home');
  }

  changePassword(): void {
    this.appService.recoveryPassword({ email: this.email.value }).subscribe({
      next: (response) => {
        this.successChange = true;
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao recuperar senha. Por favor, tente novamente!');
      }
    })
  }
}
