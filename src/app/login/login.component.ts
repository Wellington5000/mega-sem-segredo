import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  setStep(step: Step): void {
    this.step = step;
  }

  login(): void {
    this.router.navigateByUrl('/home');
  }
}
