import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { UseTermsComponent } from './use-terms/use-terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SuccessComponent } from './success/success.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CheckHitsComponent } from './check-hits/check-hits.component';
import { BetScorerComponent } from './bet-scorer/bet-scorer.component';
import { LoginComponent } from './login/login.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { BuyCreditComponent } from './buy-credit/buy-credit.component';

const routes: Routes = [
  { path: 'register/:origin', component: RegisterComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'payment-methods', component: RegisterComponent },
  { path: 'use-terms', component: UseTermsComponent },
  { path: 'success-register/:origin', component: SuccessComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'check-hits', component: CheckHitsComponent },
  { path: 'bet-scorer', component: BetScorerComponent },
  { path: 'buy-credit', component: BuyCreditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: InitialPageComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule { }
