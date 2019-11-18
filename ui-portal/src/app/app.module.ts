import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { PreHomeComponent } from './pre-home/pre-home.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { LoginComponent } from './login/login.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { BonusComponent } from './bonus/bonus.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    PreHomeComponent,
    PaymentSuccessComponent,
    TransactionHistoryComponent,
    LoginComponent,
    OvertimeComponent,
    BonusComponent
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
