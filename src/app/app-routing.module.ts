import { NgModule,Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
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
 

const routes: Routes = [
  
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"",
    component:LoginComponent
  },
  {
    path:'home',
    component:NavComponent,
    children:[
      {
        path:"",
        component:DashboardComponent
      },
      {
        path:"dashboard",
        component:DashboardComponent
      },
      {
        path:"userlist",
        component:UserlistComponent
      },
      {
        path:"inrdeposit",
        component:TransactionlistComponent
      },
      {
        path:"usdtdeposit",
        component:UsdtdepositComponent
      },
      {
        path:"inrwithdraw",
        component:WithdrawlistComponent
      },
      {
        path:"usdtwithdraw",
        component:UsdtwithdrawComponent
      },
      {
        path:"userdetails",
        component:UserviewComponent
      },
      {
        path:"depositdetails",
        component:TransactiondetailsComponent
      },
      {
        path:"withdrawdetails",
        component:WithdrawdetailsComponent
      },
      {
        path:"kyclist",
        component:KyclistComponent
      },
      {
        path:"banklist",
        component:BanklistComponent
      },
      {
        path:"bankdetails",
        component:BankdetailsComponent
      },
      {
        path:"nextpayout",
        component:NextpayoutComponent
      },
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
