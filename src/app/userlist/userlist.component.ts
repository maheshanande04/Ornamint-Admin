import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
 import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonserviceService } from '../commonservice.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface User {
  isContractHolder: any;
  contract_referral_earning_inr: any;
  referral_code: any;
  address: any;
  username: string;
  userId: number;
  email: string;
  mobile_number: string;
  isVerified:string;
  userPANNumber: string;
  userAadharNumber: string;
  kycstatus: string;
  bankstatus:string;
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  
  filterform: FormGroup;
  profiledata: any;
  q:number=1;
  userlist:User[]=[]
  searchText: string = '';
  selectedKycStatus: string = '';
  userstatus: string = '';
  selectedbankStatus:string='';
  pendingstatus:number=0
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  constructor(private router:Router, private user:CommonserviceService,private fb: FormBuilder){
    this.profiledata = JSON.parse(localStorage.getItem('userdetails') as any);
    this.fetchtlist();
   
    this.filterform = this.fb.group({
      selectedOption: [''],
      search:['']
    });
  }
   
  
  fetchtlist(){
    if(this.profiledata.token){
      var t =this.profiledata.token
      var header = {
        headers: new HttpHeaders()
          .set('token',  `${t}`)
      }
      let url='superAdmin/get/User'
      let payload = {
        "page": this.pagenumbr ,
        // "sortBy":"status",
        "sortOrder": "DESC",
        // "search":103272
       }
      this.user.postcall(url,payload,header).subscribe(result=>{
        this.userlist=result.data.results
        this.totalPages=result.data.totalPages
        console.log(this.userlist);
        
      })
    }
  }


  matchesSearchText(user:any) {
    // const lowerCaseSearchText = this.searchText.toLowerCase();

    var t =this.profiledata.token
    var header = {
      headers: new HttpHeaders()
        .set('token',  `${t}`)
    }
    let url='superAdmin/get/User'
    if(user.search){
      let payload = {
        "page": this.pagenumbr,
        "sortBy": "_id",
        "sortOrder": "DESC",
        "search":user.search
       }
       this.user.postcall(url, payload, header).subscribe((result: any) => {
        this.userlist=result.data.results
        this.totalPages=result.data.totalPages
        console.log(this.userlist);
        
      });
    }else if(user.selectedOption){
      let payload = {
        "page": this.pagenumbr,
        "sortBy": "_id",
        "sortOrder": "DESC",
        "search":user.selectedOption
       }
       this.user.postcall(url, payload, header).subscribe((result: any) => {
        this.userlist=result.data.results
        this.totalPages=result.data.totalPages
      });
    }
   
  }


  exportToExcel() {
    const data = this.userlist.map(item => ({
      'Username':item.username,
      'email':item.email,
      'mobile_number':item.mobile_number,
      'isVerified':item.isVerified,
      'isContractHolder':item.isContractHolder,
      'contract_referral_earning_inr':item.contract_referral_earning_inr,
      'referral_code':item.referral_code,
       'walletAddress':item.address
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    this.saveAsExcelFile(excelBuffer, 'exported_data');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
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
