import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentTypeComponent } from './payment-type/payment-type.component';
import { CreditCardDataComponent } from './credit-card-data/credit-card-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PixDataComponent } from './pix-data/pix-data.component';
import { SuccessComponent } from './success/success.component';
import { PixPaymentComponent } from './pix-payment/pix-payment.component';
import { LoadingComponent } from './utils/loading/loading.component';
import { NotificationComponent } from './utils/notification/notification/notification.component';
import { UseTermsComponent } from './use-terms/use-terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CheckHitsComponent } from './check-hits/check-hits.component';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { BetScorerComponent } from './bet-scorer/bet-scorer.component';
import { LoginComponent } from './login/login.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { BuyCreditComponent } from './buy-credit/buy-credit.component';
import { CreditCardData2Component } from './credit-card-data-2/credit-card-data-2.component';
import { ProfileComponent } from './profile/profile.component';
import { TokenInterceptor } from './token.interceptor';
import { SpinnerService } from './spinner.service';
import { LuckyPixComponent } from './lucky-pix/lucky-pix.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HeaderLoggedComponent } from './components/header-logged/header-logged.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { PromotionComponent } from './promotion/promotion.component';
import { PromotionResultComponent } from './promotion-result/promotion-result.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PromotionLoggedResultComponent } from './promotion-logged-result/promotion-logged-result.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';



registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    PaymentTypeComponent,
    CreditCardDataComponent,
    PixDataComponent,
    SuccessComponent,
    PixPaymentComponent,
    LoadingComponent,
    NotificationComponent,
    UseTermsComponent,
    PrivacyPolicyComponent,
    ConfirmationComponent,
    CheckHitsComponent,
    BetScorerComponent,
    LoginComponent,
    InitialPageComponent,
    BuyCreditComponent,
    CreditCardData2Component,
    ProfileComponent,
    LuckyPixComponent,
    HeaderLoggedComponent,
    PromotionComponent,
    PromotionResultComponent,
    CheckoutComponent,
    PromotionLoggedResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    HeaderModule,
    FooterModule,
    CurrencyMaskModule,
    SocialLoginModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    SpinnerService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '899649339453-iadctomthvspc8deu50g2544kqrctlfl.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('997923862039288')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
