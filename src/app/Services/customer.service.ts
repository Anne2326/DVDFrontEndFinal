import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../modals/token';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


 private url='http://localhost:5276/api/Customer/Get Customers';
  private registerurl='http://localhost:5276/api/Auth/Customer Register';
  private loginurl='http://localhost:5276/api/Auth/Customer Login?';
  constructor(private http:HttpClient) { }

  getcustomers(){
    return this.http.get<Customer[]>(this.url);
  }


  getcustomerbyid(customerId:number){
    return this.http.get<Customer>(this.url+"/"+customerId);
  }

  customerregister(customer: any){

    return this.http.post<IToken>(this.registerurl,customer);
  }
  login(customer:any){

    return this.http.post<IToken>(this.loginurl,customer);
  }
  


  isLoggedIn(){


    if(localStorage.getItem('token')){

      const token=localStorage.getItem('token');
      if(token){

        const decoded:any=jwtDecode(token);
        localStorage.setItem('customer',JSON.stringify(decoded));

      }
      return true;
    }
    return false;
  }

}



export interface Customer{

id:number;

    userName:string;
    phoneNumber:string;
    email: string;
    nic: string;
    password: string;
    //rentals?: DVD[];
    isActive?: boolean;
  }



















