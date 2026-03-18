import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {
  // apiurl="https://api.suvarnasiddhi.com"

  // Test URL
  apiurl="https://api.ornamint.org"
  // apiurl="https://api-new-prod.cypherbox.in"

   constructor(private http:HttpClient) { }

  postcall(url:any,payload:any,header:any):Observable<any>{
    return this.http.post(`${this.apiurl}/${url}`,payload,header);
  }
  getcall(url:any,header:any):Observable<any>{
    return this.http.get(`${this.apiurl}/${url}`,header);
  }
  getuserlist(url:any){
    return this.http.get(url);
  }

  private readonly USERDATA_KEY = 'ornamint_admin_userdata';
  userdata: any;

  setuserdata(data: any) {
    this.userdata = data;
    try {
      sessionStorage.setItem(this.USERDATA_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage failures (private mode / disabled storage).
    }
  }

  getuserdata() {
    if (this.userdata != null) return this.userdata;
    try {
      const raw = sessionStorage.getItem(this.USERDATA_KEY);
      if (!raw) return this.userdata;
      this.userdata = JSON.parse(raw);
      return this.userdata;
    } catch {
      return this.userdata;
    }
  }

  clearUserdata() {
    this.userdata = null;
    try {
      sessionStorage.removeItem(this.USERDATA_KEY);
    } catch {
      // Ignore
    }
  }

  status:any
  setstatus(data: any){
    this.status=data
  }
  getstatus(){
    return this.status
  }
}
