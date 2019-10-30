import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PreHomeComponent } from './pre-home/pre-home.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'profile' },  
  { path: 'prehome', component: PreHomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'paymentsuccess', component: PaymentSuccessComponent },
  { path: 'history', component: TransactionHistoryComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
