import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  // apiurl="https://api.suvarnasiddhi.com"

  // Test URL
  apiurl="https://api.ornamint.org"
  // apiurl="https://api-new-prod.cypherbox.in"



  constructor(private http:HttpClient) { }

  getlogin(url:any,payload:any):Observable<any>{
    return this.http.post(`${this.apiurl}/${url}`,payload);
  }
  postcall(url:any,payload:any,header:any):Observable<any>{
    return this.http.post(`${this.apiurl}/${url}`,payload,header);
  }
  useremail:any
  setmail(data: any){
    this.useremail=data
  }
  getmail(){
    return this.useremail
  }
}
