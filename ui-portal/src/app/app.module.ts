import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { SplashComponent } from './splash/splash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SubmitLoanComponent } from './submit-loan/submit-loan.component';
import { ProfileComponent } from './profile/profile.component';
import { PreHomeComponent } from './pre-home/pre-home.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SplashComponent,
    SubmitLoanComponent,
    ProfileComponent,
    PreHomeComponent,
    PaymentSuccessComponent,
    TransactionHistoryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
