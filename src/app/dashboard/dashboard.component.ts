import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonserviceService } from '../commonservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  profiledata: any;
  data: any;
  paymenthistorydata: any;
  paymenthis: boolean=false;
  groups: any;
  activegroup: any;
  mygroups: any;
 
  constructor(private router:Router, private user:CommonserviceService){
    this.profiledata = JSON.parse(localStorage.getItem('userdetails') as any);
  
      if(this.profiledata.token){
        var t =this.profiledata.token
        var header = {
          headers: new HttpHeaders()
            .set('token',  `${t}`)
        }
        let url='superAdmin/get/kyc'
        let payload = {
          "page": 1 ,
          "sortBy": "_id",
          "sortOrder": "DESC",
          "search": {
            "kycStatus": 2
        }
      }
        this.user.postcall(url,payload,header).subscribe(result=>{
          // this.kyclist=result.data.results
          // this.totalPages=result.data.totalPages
          // console.log(this.userlist);
          
        })
      }
    
  }
 
  pendingcount(data:any){
    // const status=1
    this.user.setstatus(data)
    if(data==1 || data==2){
      this.router.navigate(['/home/kyclist']);
    }
    if(data==3 || data==4){
      this.router.navigate(['/home/transactionlist']);
    }
  }
   
 
}
