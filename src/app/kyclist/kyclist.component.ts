import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
 import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonserviceService } from '../commonservice.service';

interface User {
  username: string;
  userId: number;
  email: string;
  mobile_number: string;
  isVerified:string;
  userPANNumber: string;
  userAadharNumber: string;
  kycstatus: string;
  bankstatus:string;
  aadharVerified:any
  panFullName:any
}
@Component({
  selector: 'app-kyclist',
  templateUrl: './kyclist.component.html',
  styleUrls: ['./kyclist.component.css']
})
export class KyclistComponent {
 
  profiledata: any;
  q:number=1;
  userlist:User[]=[]
  searchText: string = '';
  selectedKycStatus: string = '';
  userstatus: string = '';
  selectedbankStatus:string='';
  pendingstatus:number=0

  constructor(private router:Router, private user:CommonserviceService,private fb: FormBuilder){
    this.profiledata = JSON.parse(localStorage.getItem('userdetails') as any);
    this.fetchtlist();

  }
 
  
  fetchtlist(){
    if(this.profiledata.token){
      var t =this.profiledata.token
      var header = {
        headers: new HttpHeaders()
          .set('token',  `${t}`)
      }
      let url='superAdmin/get/kyc'
      let payload = {
        "page": this.pagenumbr ,
        "sortBy": "_id",
        "sortOrder": "DESC",
        "search": {
          "kycStatus": 2
      }
       }
      this.user.postcall(url,payload,header).subscribe(result=>{
        const userlistdata=result.data.results
        this.totalPages=result.data.totalPages
        this.userlist = userlistdata.filter((item: {aadharVerified: any;}) => item.aadharVerified == 2);

        console.log(this.userlist);
        
      })
    }
  }

  itemsPerPage: number = 10; // Number of items to display per page
  currentPage: number = 1; // Current page number
  totalPages: number = 0; // Total number of pages
  pagenumbr=1
  pageNumbers: number[] = []; // Array to store page numbers
  loading: boolean = false;

  getCurrentPageItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.userlist.slice(startIndex, endIndex);
  }

  get visiblePageNumbers(): number[] {
    const firstPage = this.currentPage > 5 ? this.currentPage - 4 : 1;
    const lastPage = Math.min(firstPage + 4, this.totalPages);
    return Array.from({ length: lastPage - firstPage + 1 }, (_, i) => firstPage + i);
  }

  changePage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.totalPages || this.loading) return;
    this.currentPage = pageNumber;
    if(this.currentPage){
      console.log(this.currentPage);
      
      this.pagenumbr= (this.currentPage)
    }
    this.fetchtlist();
  }

  userdetails(data:any){
    this.user.setuserdata(data)
    console.log(data);
    this.router.navigate(['/home/userdetails'])
  }

  ngOnInit(): void {
    this.pendingstatus=this.user.getstatus()
    console.log(this.pendingstatus);
    if(this.pendingstatus==1){
      this.selectedKycStatus='0'
     }
     if(this.pendingstatus==2){
      this.selectedbankStatus='0'
     }
  }
}
