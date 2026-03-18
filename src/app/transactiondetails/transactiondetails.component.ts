import { Component } from '@angular/core';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transactiondetails',
  templateUrl: './transactiondetails.component.html',
  styleUrls: ['./transactiondetails.component.css']
})
export class TransactiondetailsComponent {
  depositstatusform: FormGroup;
  data: any;
  profiledata: any;


  constructor( private user: CommonserviceService, private router:Router,private fb: FormBuilder) { 
    this.profiledata = JSON.parse(localStorage.getItem('userdetails') as any);
    
    this.depositstatusform = this.fb.group({
      selectedOption: ['', Validators.required],
    });
  }

  onSubmitstatus() {
    // Handle form submission here
    console.log('Selected Option:', this.depositstatusform.value.selectedOption);
    var t =this.profiledata.token
    var header = {
      headers: new HttpHeaders()
        .set('token',  `${t}`)
    }
    let url='superAdmin/updateDepositRequest'
    let status=this.depositstatusform.value.selectedOption
    status = parseInt(status, 10);
    let payload = {
      "txnID":this.data.txnID,
      "status":status,
      "user_id":this.data.user_id
      // "reason":"Verified"
     }
    this.user.postcall(url,payload,header).subscribe(result=>{
      if(result.message=='Deposit request Rejected Successfully' || result.message=='Deposit request Approved Successfully'){
        Swal.fire({
          title: 'Success',
          text: result.message,
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/home/deposit']);
          }
        });
      }
     
    this.fetchtlist()
    })
  }
  
fetchtlist(){
  if(this.profiledata.token){
    var t =this.profiledata.token
    var header = {
      headers: new HttpHeaders()
        .set('token',  `${t}`)
    }
    let url='superAdmin/get/depositINRRequest'
    let payload = {
      "page": 1 ,
      "sortBy":'_id',
      "sortOrder": "DESC",
      "search":this.data.user_id
     }
    this.user.postcall(url,payload,header).subscribe(result=>{
      this.data=result.data.results      
    })
  }
}
  ngOnInit(): void {
     this.data=this.user.getuserdata()
     if(this.data==null){
      // Selected row data is stored in sessionStorage; if still missing, just go back to list.
      this.router.navigate(['/home/inrdeposit'])
    }
  }
}
