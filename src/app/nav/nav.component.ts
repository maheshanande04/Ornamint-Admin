import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonserviceService } from '../commonservice.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  profiledata: any;
  data: any;
  navshow:boolean = true;
  navhide:boolean = false;

  navbar(){ this.navshow = !this.navshow; this.navhide = !this.navhide }
  showSubMenudeposit: boolean = false;
  showSubMenuwithdraw:boolean=false;

  toggleSubMenu(text:any) {
    if(text=='deposit'){
      this.showSubMenudeposit = !this.showSubMenudeposit;
    }else if(text=='withdraw'){
      this.showSubMenuwithdraw = !this.showSubMenuwithdraw;
    }
  }
constructor(private router:Router, private user:CommonserviceService){
  this.profiledata = JSON.parse(localStorage.getItem('userdetails') as any);
 
  if(this.profiledata.token){
    var t =this.profiledata.token
    var header = {
      headers: new HttpHeaders()
        .set('token',  `${t}`)
    }
    let url='superAdmin/get/userStats'
    let payload = {
      // "page": 1,
      // "sortBy": "_id",
      // "search":103054
    }
    this.user.postcall(url,payload,header).subscribe(result=>{
      this.data=result.data
    })
  }
}

  logout(){
    this.user.clearUserdata();
    localStorage.removeItem('userdetails'); 
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    // if (sessionStorage.getItem('reloaded')) {
    //   window.location.reload();
    //   sessionStorage.removeItem('reloaded');
    // }
  }
  }
