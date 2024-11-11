import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';

type Step = 'email' | 'password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data = {
    "id": "3875794279359314",
    "name": "Wellington Teixeira",
    "email": "wellingtonsantos5000@gmail.com",
    "photoUrl": "https://graph.facebook.com/3875794279359314/picture?type=normal",
    "firstName": "Wellington",
    "lastName": "Teixeira",
    "authToken": "EAAOLm0FPSvgBO2EqZA892AtZBI9GFzwf64mhrqGPadLu5RnSESrc7ZCvG7W7YdukP5i2cOpDqKOdbZCGx1rZCTQEQZAQIXn6CKjuDmT8ZBmZBqcPeWAa5LdLp2biwSNNQhPGyqvpvOXAsQi2O6OmEZBMAo6aHjGZAuZCTMQfAh2ZBamH6tx3CD721lyH7o6W6ugbarrahU709VDg8lw8p5K1dQZDZD",
    "response": {
        "name": "Wellington Teixeira",
        "email": "wellingtonsantos5000@gmail.com",
        "picture": {
            "data": {
                "height": 50,
                "is_silhouette": false,
                "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3875794279359314&height=50&width=50&ext=1733874997&hash=AbZXyYvLYb0Puudkxs7NJIgA",
                "width": 50
            }
        },
        "first_name": "Wellington",
        "last_name": "Teixeira",
        "id": "3875794279359314"
    },
    "provider": "FACEBOOK"
}

  hasError: boolean = false;
  showPassword: boolean = false;
  step: Step = 'email';
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(
    private router: Router,
    private appService: AppService,
    private authService: SocialAuthService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.createCookie();

    (window as any).google.accounts.id.initialize({
      client_id: '899649339453-iadctomthvspc8deu50g2544kqrctlfl.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
    });

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
        this.saveAndRedirect(response);
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Senha incorreta!');
      }
    })
  }

  loginWithGoogle(): void {
    (window as any).google.accounts.id.prompt();
  }
  
  handleCredentialResponse(response: any) {
    const token = response.credential;
    
    if(token) {
      const user = this.decodeToken(token);
      const userInfo = { ...user, token: token };
      this.googleLogin(userInfo);
    }
  }

  googleLogin(body: any): void {
    this.appService.googleLogin(body).subscribe({
      next: (response) => {
        this.saveAndRedirect(response);
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message);
      }
    })
  }

  decodeToken(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((response) => {
      this.facebookLogin(this.getFacebookUser(response));
    }).catch((error) => {
      if(error !== 'User cancelled login or did not fully authorize.') {
        this.notificationService.notify('Ocorreu um erro ao fazer login. Por favor, tente novamente!');
      }
    });
  }

  getFacebookUser(user: any) {
    return {
      id: user?.id,
      email: user?.email,
      name: user?.name,
      token: user?.authToken
    }
  }

  facebookLogin(body: any): void {
    this.appService.facebookLogin(body).subscribe({
      next: (response) => {
        this.saveAndRedirect(response);
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao fazer login. Por favor, tente novamente!');
        this.signOut();
      }
    })
  }

  signOut(): void {
    this.authService.signOut();
  }

  

  saveAndRedirect(response: any): void {
    localStorage.setItem('access-token', response?.token);
    localStorage.setItem('user', JSON.stringify(response));
    this.router.navigateByUrl('/home');
  }
}
