import { Component } from '@angular/core';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-withdrawdetails',
  templateUrl: './withdrawdetails.component.html',
  styleUrls: ['./withdrawdetails.component.css']
})
export class WithdrawdetailsComponent {
  depositstatusform: FormGroup;
  data: any;
  profiledata: any;


  constructor( private user: CommonserviceService, private router:Router,private fb: FormBuilder) { 
    this.profiledata = JSON.parse(localStorage.getItem('userdetails') as any);
    
    this.depositstatusform = this.fb.group({
      selectedOption: ['', Validators.required],
      utrnumber:[''],
      reason:['']
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
    let url='superAdmin/updateINRWithdrawalStatus'
    let status=this.depositstatusform.value.selectedOption
    status = parseInt(status, 10);
    let payload = {
      "txnID":this.data._id,
      "status":this.depositstatusform.value.selectedOption,
      "utr": this.depositstatusform.value.utrnumber,
      "reason": this.depositstatusform.value.reason
     }
     console.log(payload)
    this.user.postcall(url,payload,header).subscribe(result=>{
      if(result.data.modifiedCount==1){
        Swal.fire({
          title: 'Done',
          text: result.message,
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/home/withdraw']);
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
    let url='superAdmin/get/depositRequest'
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
      this.router.navigate(['/home/inrwithdraw'])
    }
  }
}
