import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../modals/token';
import { Customer, Rental } from '../customer/customer.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


 private url='http://localhost:5276/api/Customer/GetCustomers';
  private registerurl='http://localhost:5276/api/Auth/CustomerRegister';
  private loginurl='http://localhost:5276/api/Auth/CustomerLogin';
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
  customerlogin(customer:any){

    return this.http.post<IToken>(this.loginurl,customer);
  }
  addrental(rentalRequest: { customerId: number; dvdId: number; rentalDate: string }){
    return this.http.post('http://localhost:5276/api/Rental/AddRental',rentalRequest)
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


getrentalbycus(customerId:number){
return this.http.get<Rental[]>('http://localhost:5276/api/Rental/GetAllRentalByCustomerId/'+customerId)
}

getsinglecus(customerid:number){
  return this.http.get('http://localhost:5276/api/Customer/Getcustomer/'+customerid)
}


}




















