import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
 import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonserviceService } from '../commonservice.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface User {
  bankDetails: any;
  username: string;
   email: string;
   status:string;
  type: string;
  createdDate:string;
  amount:string;
  receiveAmount:string;
  user_id:any;
  paymentDate:any;
  ist_date:any;
  txnDetails: TxnDetails;
 }

interface TxnDetails {
  txid: string;
  amount: string;
  requestedAmountToWithdraw: string;
  feesInUsdt: number;
  ist_date_time: string;
  status:number;
}
@Component({
  selector: 'app-usdtwithdraw',
  templateUrl: './usdtwithdraw.component.html',
  styleUrls: ['./usdtwithdraw.component.css']
})
export class UsdtwithdrawComponent  {

  profiledata: any;
  q:number=1;
  userlist:User[]=[]
  searchText: string = '';
  typeStatus: string = '';
  transactionstatus: string = '';
  pendingstatus:number=0
  filtername: any;
  filterform: FormGroup;
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

 

  constructor(private router:Router, private user:CommonserviceService,private fb: FormBuilder){
    this.profiledata = JSON.parse(localStorage.getItem('userdetails') as any);
    this.fetchtlist();
      
    this.filterform = this.fb.group({
      selectedOption: [''],
      search:['']
    });
  }
  // get filteredUsers() {
  //   return this.userlist.filter((user:any) =>
  //     (this.matchesSearchText(user) && this.matchetransactionStatus(user) && this.matchestypeStatus(user) )
  //   );
  // }

  matchesSearchText(user:any) {
    // const lowerCaseSearchText = this.searchText.toLowerCase();

    var t =this.profiledata.token
    var header = {
      headers: new HttpHeaders()
        .set('token',  `${t}`)
    }
    let url='superAdmin/getUSDTWithdrawalRequests'
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
      });
    }else if(user.selectedOption){
      let payload = {
        "page": this.pagenumbr,
        "sortBy": "_id",
        "sortOrder": "DESC",
        "search":user.selectedOption
       }
       this.user.postcall(url, payload, header).subscribe((result: any) => {
        this.userlist=result
        this.totalPages=1
      });
    }
   
  }

  exportToExcel() {
    const data = this.userlist.map(item => ({
      'Username':item.username,
      'DEBIT_ACC_NO':'785205000199',
      'BNF_NAME': item.bankDetails.bankAccountFullName,
      'BENE_ACC_NO': item.bankDetails.bankAccountNumber,
      'BENE_IFSC': item.bankDetails.bankAccountIfsc,
      'AMOUNT': item.amount,
      'CREDIT_NARR': 'Salary Credit',
      'PYMT_DATE':item.ist_date,
      'status':item.status,
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
   
  userdetails(data:any){
    this.user.setuserdata(data)
    console.log(data);
    this.router.navigate(['/home/withdrawdetails'])
  }


fetchtlist(){
  if(this.profiledata.token){
    var t =this.profiledata.token
    var header = {
      headers: new HttpHeaders()
        .set('token',  `${t}`)
    }
    let url='superAdmin/getUSDTWithdrawalRequests'
    let payload = {
      "page": this.pagenumbr ,
      // "sortBy":"status",
      "sortOrder": "DESC",
      // "search":103272
     }
    this.user.postcall(url,payload,header).subscribe(result=>{
      this.userlist=result
      this.totalPages=1
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

  ngOnInit(): void {
    this.pendingstatus=this.user.getstatus()
    console.log(this.pendingstatus);
    if(this.pendingstatus==3){
      this.transactionstatus='0'
      this.typeStatus='Deposit'
     }
     if(this.pendingstatus==4){
      this.transactionstatus='0'
      this.typeStatus='Withdraw'
     }
  }
}
