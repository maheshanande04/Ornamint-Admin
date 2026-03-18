import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
 import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonserviceService } from '../commonservice.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface User {
  amount: any;
  nextPayoutDate: any;
  username: string;
  dAmount:string;
  daily_percentage:any;
 }
@Component({
  selector: 'app-nextpayout',
  templateUrl: './nextpayout.component.html',
  styleUrls: ['./nextpayout.component.css']
})
export class NextpayoutComponent  {
  profiledata: any;
  p:number=1;
  payoutrecord:User[]=[]
  searchText: string = '';
  typeStatus: string = '';
  transactionstatus: string = ''; 
  pendingstatus:number=0
  filtername: any;
  filterform: FormGroup;
  

  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // payoutrecord: any;


  constructor(private router:Router, private user:CommonserviceService,private fb: FormBuilder){
    this.profiledata = JSON.parse(localStorage.getItem('userdetails') as any);
    this.fetchtlist();
      
    this.filterform = this.fb.group({
      selectedOption: [''],
      search:[]
    });
  }
 
  exportToExcel() {
    const data = this.payoutrecord.map(item => ({
      'Username':item.username,
      'Server Amount': item.amount,
      'ROI Amount': item.dAmount,
      'Percentage': item.daily_percentage,
      'nextPayoutDate': item.nextPayoutDate,
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
 
fetchtlist(){
  if(this.profiledata.token){
    var t =this.profiledata.token
    var header = {
      headers: new HttpHeaders()
        .set('token',  `${t}`)
    }
    let url='superAdmin/nextPayoutRecordsForThisMonth'
    let payload = {
     }
    this.user.postcall(url,payload,header).subscribe(result=>{
      this.payoutrecord=result.data
    })
  }
}


  ngOnInit(): void {
    this.fetchtlist()
  }
}
