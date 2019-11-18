import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PreHomeComponent } from './pre-home/pre-home.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { LoginComponent } from './login/login.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { BonusComponent } from './bonus/bonus.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },  
  { path: 'prehome', component: PreHomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'paymentsuccess', component: PaymentSuccessComponent },
  { path: 'history', component: TransactionHistoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'overtime', component: OvertimeComponent },
  { path: 'bonus', component: BonusComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
