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
import { ProfileComponent } from './profile/profile.component';
import { GuestGuard } from './auth/guest.guard';
import { AuthRedirectGuard } from './auth/auth-redirect.guard';
import { PromotionComponent } from './promotion/promotion.component';
import { PromotionResultComponent } from './promotion-result/promotion-result.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PromotionLoggedResultComponent } from './promotion-logged-result/promotion-logged-result.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LotterySelectionComponent } from './lottery-selection/lottery-selection.component';
import { LotteryComponent } from './lottery/lottery.component';
import { LotofacilComponent } from './lotofacil/lotofacil.component';
import { CombinationsComponent } from './combinations/combinations.component';
import { DuplaSenaComponent } from './promotions/dupla-sena/dupla-sena.component';
import { SimulateComponent } from './lotofacil/simulate/simulate.component';
import { SimulateResultComponent } from './lotofacil/simulate-result/simulate-result.component';

const routes: Routes = [
  { path: 'lotofacil-simulate-result', component: SimulateResultComponent },
  { path: 'lotofacil-simulate', component: SimulateComponent },
  { path: 'dupla-sena', component: DuplaSenaComponent },
  { path: 'combinations/:id', component: CombinationsComponent, canActivate: [GuestGuard] },
  { path: 'lotofacil/:combination', component: LotofacilComponent, canActivate: [GuestGuard] },
  { path: 'lottery/:lottery', component: LotteryComponent, canActivate: [GuestGuard] },
  { path: 'lottery-selection', component: LotterySelectionComponent, canActivate: [GuestGuard] },
  { path: 'change-password/:type', component: ChangePasswordComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'promotion-result', component: PromotionResultComponent, canActivate: [GuestGuard] },
  { path: 'promotion-logged-result', component: PromotionLoggedResultComponent, canActivate: [GuestGuard] },
  { path: 'promotion', component: PromotionComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [GuestGuard] },
  { path: 'register/:origin', component: RegisterComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'payment-methods', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'use-terms', component: UseTermsComponent },
  { path: 'success-register/:origin', component: SuccessComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'check-hits', component: CheckHitsComponent },
  { path: 'bet-scorer', component: BetScorerComponent },
  { path: 'buy-credit', component: BuyCreditComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] },
  { path: 'home', component: InitialPageComponent, canActivate: [GuestGuard] },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule { }
