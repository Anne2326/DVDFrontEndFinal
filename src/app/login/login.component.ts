import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CustomerService } from '../Services/customer.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router,private toastr:ToastrService,private customerservice: CustomerService) {

this.loginForm=new FormGroup({
  username:new FormControl(""),
  password:new FormControl("")
})


   }




  ngOnInit(): void {

    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required,

        Validators.minLength(6),
        Validators.maxLength(6)

      ]]


    })





  }

  onSubmit()
  {

     console.log("on submit initialite");
     

    if(this.loginForm.valid){
      console.log("123")
      this.customerservice.customerlogin(this.loginForm.value).subscribe(data=>{
        
        localStorage.setItem('token',data.custokken);
        console.log(data);
        if (data.custokken) {
          
        const decoded:any=jwtDecode(data.custokken);
        console.log(decoded);
        console.log(decoded.Role)
        localStorage.setItem('customer',JSON.stringify(decoded));
        if(decoded.Role=="Customer"){
          this.toastr.success("Login Successfully","Success");
          this.router.navigate(['/customer']);
          
        }else if(decoded.Role=="Admin"){
          this.router.navigate(['/ admin']);
        }
       }
       


  }
)}
     
      


    
    }
  }






