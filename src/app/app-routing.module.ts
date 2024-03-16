import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { UseTermsComponent } from './use-terms/use-terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SuccessComponent } from './success/success.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PaymentTypeComponent } from './payment-type/payment-type.component';
import { CheckHitsComponent } from './check-hits/check-hits.component';
import { LuckyPixComponent } from './lucky-pix/lucky-pix.component';
import { PixPayment2Component } from './pix-payment2/pix-payment2.component';

const routes: Routes = [
  { path: 'register/:origin', component: RegisterComponent },
  { path: 'payment-methods', component: RegisterComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'success-register/:origin', component: SuccessComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'check-hits', component: CheckHitsComponent },
  { path: 'lucky-pix', component: LuckyPixComponent },
  { path: 'pix-payment-2', component: PixPayment2Component },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule { }
