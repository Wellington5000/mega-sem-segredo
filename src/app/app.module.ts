import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
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
import { DeviceDetectorService } from 'ngx-device-detector';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { CheckHitsComponent } from './check-hits/check-hits.component';
import { LuckyPixComponent } from './lucky-pix/lucky-pix.component';
import { ClipboardModule } from '@angular/cdk/clipboard';



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
    LuckyPixComponent
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
    ClipboardModule
  ],
  providers: [DeviceDetectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
