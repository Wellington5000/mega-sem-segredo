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
import { ChangePasswordComponent } from './change-password/change-password.component';
import { Section4Component } from './section-4/section-4.component';
import { ImageComponent } from './components/image/image.component';
import { Section5Component } from './section-5/section-5.component';
import { Section6Component } from './section-6/section-6.component';
import { Section7Component } from './section-7/section-7.component';
import { LotterySelectionComponent } from './lottery-selection/lottery-selection.component';
import { LotteryComponent } from './lottery/lottery.component';
import { LotofacilComponent } from './lotofacil/lotofacil.component';
import { CombinationsComponent } from './combinations/combinations.component';
import { DuplaSenaComponent } from './promotions/dupla-sena/dupla-sena.component';
import { SimulateComponent } from './lotofacil/simulate/simulate.component';
import { SimulateResultComponent } from './lotofacil/simulate-result/simulate-result.component';
import { CombinationTypeSelectionComponent } from './dupla-sena/combination-type-selection/combination-type-selection.component';
import { DuplaSenaCombinationComponent } from './dupla-sena/dupla-sena-combination/dupla-sena-combination.component';
import { DuplaSenaCombinationsComponent } from './dupla-sena/dupla-sena-combinations/dupla-sena-combinations.component';
import { DuplaSenaSimulateComponent } from './dupla-sena/dupla-sena-simulate/dupla-sena-simulate.component';
import { DuplaSenaSimulateResultComponent } from './dupla-sena/dupla-sena-simulate-result/dupla-sena-simulate-result.component';



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
    PromotionLoggedResultComponent,
    ChangePasswordComponent,
    Section4Component,
    Section5Component,
    Section6Component,
    Section7Component,
    ImageComponent,
    LotterySelectionComponent,
    LotteryComponent,
    LotofacilComponent,
    CombinationsComponent,
    DuplaSenaComponent,
    SimulateComponent,
    SimulateResultComponent,
    CombinationTypeSelectionComponent,
    DuplaSenaCombinationComponent,
    DuplaSenaCombinationsComponent,
    DuplaSenaSimulateComponent,
    DuplaSenaSimulateResultComponent
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
    SocialLoginModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    SpinnerService,
    {
        provide: LOCALE_ID,
        useValue: 'pt'
    },
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
