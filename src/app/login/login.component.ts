import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform: FormGroup;
  passwordVisible = false;
  alertmsg: any;
  paramcode: any;
  test: any;
  data:any;
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
 
  constructor(private user:AuthserviceService,private router:Router,private fb: FormBuilder,private code: ActivatedRoute) {
    this.loginform = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
    });
  }

  loginsubmit(formData: any) {
    let url='sLogin'
    let payload = {
      "username": formData.email,
      "password": formData.password,
      "device_add": "123.3.1.2",
      "device_type": "web",
      "platform":"pixo"
    }
      if(this.loginform.valid){
          this.user.getlogin(url,payload).subscribe(result=>{
            this.data=result; 
            localStorage.setItem('userdetails', JSON.stringify(this.data));
              if(this.data.message== 'You are logged into Ornamint'){
                this.router.navigate(['/home']);
                sessionStorage.setItem('reloaded', 'true');
                }
                else{
                  Swal.fire(
                    'Failed',
                     "Login failed. Please check your username or password and try again",
                    'error'
                  )
              if(this.data.message == 'Not Found'){
                Swal.fire(
                  'Error',
                   "User Not Found",
                  'error'
                )
              }
              // else{
              //   Swal.fire(
              //     'Failed',
              //      "Login failed. Please check your username or password and try again",
              //     'error'
              //   )
                
              }
            
           
          })
        }
  }

  ngOnInit(): void {
    this.code.queryParams.subscribe(queryParam => {
      this.paramcode = queryParam
      this.test = this.paramcode.ref
      // console.log(this.test);
    })
  }
}
