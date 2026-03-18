import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
 import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonserviceService } from '../commonservice.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface User {
  txnDetails:txnDetail
  username: string;
 }
 interface txnDetail {
  amount: any;
  currency: any;
  from_address: any;
  to_address: any;
  txid: any;
  ist_date  : any;
  status:any;
 }
@Component({
  selector: 'app-usdtdeposit',
  templateUrl: './usdtdeposit.component.html',
  styleUrls: ['./usdtdeposit.component.css']
})
export class UsdtdepositComponent {
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
      search:[]
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
    let url='superAdmin/getUSDTDepositRequests'
    let payload = {
      // "page": this.pagenumbr,
      "sortBy": "_id",
      "sortOrder": "DESC",
      "search":user.selectedOption
     }
    this.user.postcall(url, payload, header).subscribe((result: any) => {
      this.userlist=result
    });
  }

  exportToExcel() {
    const data = this.userlist.map(item => ({
      // 'requestRaisedOn': item.requestRaisedOn    ,
      'Username':item.username,
      // 'damount': item.amount    ,
      // 'previous_balance': item.balances[0].previous_balance    ,
      // 'current_balance': item.balances[0].current_balance    ,   
      // 'requestUpdatedOn': item.requestUpdatedOn,
      // 'status': item.status,
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
    this.router.navigate(['/home/depositdetails'])
  }


fetchtlist(){
  if(this.profiledata.token){
    var t =this.profiledata.token
    var header = {
      headers: new HttpHeaders()
        .set('token',  `${t}`)
    }
    let url='superAdmin/getUSDTDepositRequests'
    let payload = {
      // "page": this.pagenumbr ,
      // "sortBy":"status",
      // "sortOrder": "DESC",
      // "search":103272
     }
    this.user.postcall(url,payload,header).subscribe(result=>{
      this.userlist=result
    })
  }
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
