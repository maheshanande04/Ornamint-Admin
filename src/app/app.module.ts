import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserlistComponent } from './userlist/userlist.component';
import { TransactionlistComponent } from './transactionlist/transactionlist.component';
import { UserviewComponent } from './userview/userview.component';
import { TransactiondetailsComponent } from './transactiondetails/transactiondetails.component';
import { KyclistComponent } from './kyclist/kyclist.component';
import { WithdrawlistComponent } from './withdrawlist/withdrawlist.component';
import { WithdrawdetailsComponent } from './withdrawdetails/withdrawdetails.component';
import { BanklistComponent } from './banklist/banklist.component';
import { BankdetailsComponent } from './bankdetails/bankdetails.component';
import { UsdtdepositComponent } from './usdtdeposit/usdtdeposit.component';
import { UsdtwithdrawComponent } from './usdtwithdraw/usdtwithdraw.component';
import { NextpayoutComponent } from './nextpayout/nextpayout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavComponent,
    UserlistComponent,
    TransactionlistComponent,
    UserviewComponent,
    TransactiondetailsComponent,
    KyclistComponent,
    WithdrawlistComponent,
    WithdrawdetailsComponent,
    BanklistComponent,
    BankdetailsComponent,
    UsdtdepositComponent,
    UsdtwithdrawComponent,
    NextpayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
