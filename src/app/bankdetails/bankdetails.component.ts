import { Component } from '@angular/core';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.css']
})
export class BankdetailsComponent {
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
     let status=this.depositstatusform.value.selectedOption
    status = parseInt(status, 10);
    let url='superAdmin/updateKycStatus'
   let payload = {
     "user_id": this.data.user_id,
     "update": {
         "bankAccountVerified": status,
     }
    }
    console.log(payload)
    this.user.postcall(url,payload,header).subscribe(result=>{
      if(result.message.modifiedCount==1){
        Swal.fire({
          title: 'Done',
          text: "",
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/home/banklist']);
          }
        });
      }
     
     })
  }
  
 
  ngOnInit(): void {
     this.data=this.user.getuserdata()
     if(this.data==null){
      this.router.navigate(['/home/banklist'])
    }
  }
}
