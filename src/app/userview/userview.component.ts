import { Component } from '@angular/core';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent {
  adharstatusform: FormGroup;
  balanceform:FormGroup;
    depositstatusform: FormGroup;

  data: any;
  profiledata: any;
  kycdata: any;
  userid: any;
  kycimage: any;
  bal_currency: any;

  constructor( private user: CommonserviceService, private router:Router,private fb: FormBuilder) { 
    this.profiledata = JSON.parse(localStorage.getItem('userdetails') as any);
    
    this.adharstatusform = this.fb.group({
      selectedOption: ['', Validators.required],
    });
    this.balanceform=this.fb.group({
      amount:['',Validators.required],
      reason:['',Validators.required]

    })
    
 
    this.depositstatusform = this.fb.group({
      selectedOption: ['', Validators.required],
    });
    setTimeout(() => {
     this.fetchtkycdetails()
    }, 1000);
  }

  adharresetkyc() {
    var t =this.profiledata.token
   var header = {
     headers: new HttpHeaders()
       .set('token',  `${t}`)
   }
   let url='superAdmin/updateKycStatus'
   let payload = {
     "user_id": this.userid,
     "update": {
         "aadharVerified":0,
     }
    }
   this.user.postcall(url,payload,header).subscribe(result=>{
   this.fetchtkycdetails()
   })
 }
  panresetkyc() {
  var t =this.profiledata.token
 var header = {
   headers: new HttpHeaders()
     .set('token',  `${t}`)
 }
 let url='superAdmin/updateKycStatus'
 let payload = {
   "user_id": this.userid,
   "update": {
       "panVerified":0,
   }
  }
 this.user.postcall(url,payload,header).subscribe(result=>{
 this.fetchtkycdetails()
 })
}

bankresetkyc() {
  var t =this.profiledata.token
 var header = {
   headers: new HttpHeaders()
     .set('token',  `${t}`)
 }
 let url='superAdmin/updateKycStatus'
 let payload = {
   "user_id": this.userid,
   "update": {
       "bankAccountVerified":0,
   }
  }
 this.user.postcall(url,payload,header).subscribe(result=>{
 this.fetchtkycdetails()
 })
}

selectcurrency(value:any){
this.bal_currency=value
}
addbalance(formdata:any){
  var t =this.profiledata.token
 var header = {
   headers: new HttpHeaders()
     .set('token',  `${t}`)
 }
 let url='superAdmin/credit'
 let payload = {
   "user_id": this.userid,
   "amount": formdata.amount,
   "currency": this.bal_currency,
   "reason":formdata.reason
  }
 this.user.postcall(url,payload,header).subscribe(result=>{
  if(result.message=="Success"){
    Swal.fire(
      'SUCCESS',
      result.message,
      'success'
    )  
    .then((result) =>{
      this.balanceform.reset()
    })    
  } else{
    Swal.fire(
      'Error',
      result.message,
      'error'
    )
  }
 this.fetchtkycdetails()
 })
}

  onSubmitstatus() {
    var t =this.profiledata.token
    var header = {
      headers: new HttpHeaders()
        .set('token',  `${t}`)
    }
    let url='superAdmin/updateKycStatus'
    let payload = {
      "user_id": this.userid,
      "update": {
          "aadharVerified": this.adharstatusform.value.selectedOption,
      }
     }
    this.user.postcall(url,payload,header).subscribe(result=>{
    this.fetchtkycdetails()
    })
  }

  fetchtkycdetails(){
    if(this.profiledata.token){
      var t =this.profiledata.token
      var header = {
        headers: new HttpHeaders()
          .set('token',  `${t}`)
      }
      let url='superAdmin/getUserDetails'
      let payload = {
        // "page": '1' ,
        // "sortBy":"user_id",
        // "sortOrder": "DESC",
        "user_id":this.userid
        
       }
      this.user.postcall(url,payload,header).subscribe(result=>{
        this.kycdata=result.data[0]     
        if(this.kycdata.aadharVerified==2){
          var t =this.profiledata.token
          var header = {
            headers: new HttpHeaders()
              .set('token',  `${t}`)
          }
          let url='superAdmin/get/kyc'
          let payload = {
            // "page": 1,
            "sortBy": "_id",
            "sortOrder": "DESC",
            "search": {
              "kycStatus": 2
          }
           }
          this.user.postcall(url,payload,header).subscribe(result=>{
            const active = result.data.results.filter((item: {user_id: any;}) => item.user_id == this.userid);
            console.log(active);
            this.kycimage=active[0]    
          })
        }
      })
    }
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
        "sortBy":"id",
        "sortOrder": "DESC",
        "search":this.userid
       } 
    }
  }
    onSubmitbankstatus() {
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
              this.router.navigate(['/home/userlist']);
            }
          });
        }
       
       })
    }
  ngOnInit(): void {
     this.data=this.user.getuserdata()
     if(this.data==null){
      this.router.navigate(['/home/userlist'])
    }else{
           this.userid=this.data.user_id   
    }
  }
}
