import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SplashComponent } from './splash/splash.component';
import { SubmitLoanComponent } from './submit-loan/submit-loan.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'splash' },  
  { path: 'home', component: HomeComponent },
  { path: 'splash', component: SplashComponent },
  { path: 'request', component: SubmitLoanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
