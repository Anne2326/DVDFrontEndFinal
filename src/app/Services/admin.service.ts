import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DVD } from '../layout/admin/admin.component';
import { Rental } from '../customer/customer.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http:HttpClient) { }

  getalldvds(){
    return this.http.get<DVD[]>('http://localhost:5276/api/Manager/GetAllDVDs')
  }

  createdvd(dvd:FormData){
    return this.http.post('http://localhost:5276/api/Manager/AddDVD',dvd)
  }

  deletedvd(id:number){
    return this.http.delete('http://localhost:5276/api/Manager/'+id)
  }


  getallrentals(){
    return this.http.get<Rental[]>('http://localhost:5276/api/Rental/GetAllRental')
    
  }
}


 