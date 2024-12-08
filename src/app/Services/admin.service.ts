import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DVD } from '../layout/admin/admin.component';
import { Rental } from '../customer/customer.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:5276/api/Rental'; // Base URL of your backend API
  getalldvds(){
    return this.http.get<DVD[]>('http://localhost:5276/api/Manager/GetAllDVDs')
  }

  getsingledvd(id:number){
    return this.http.get('http://localhost:5276/api/Manager/'+id)
  }


  createdvd(dvd:FormData){
    return this.http.post('http://localhost:5276/api/Manager/AddDVD',dvd)
  }

  updateDvd(data: any) {
    return this.http.patch(`http://localhost:5276/api/Manager/${data.id}`, data);
  }
  deletedvd(id:number){
    return this.http.delete('http://localhost:5276/api/Manager/'+id)
  }


  getallrentals(){
    return this.http.get<Rental[]>('http://localhost:5276/api/Rental/GetAllRental')
  }

// Method to accept rental by ID
acceptRental(id: number) {
  return this.http.put(`${this.baseUrl}/RentalAccept/${id}`, null);
}

rejectrental(id:number){
  return this.http.put(`${this.baseUrl}/RejectRental/${id}`,null)
}

getAcceptedRentalsCount() {
  return this.http.get<{ count: number }>('http://localhost:5276/api/Rental/CountAcceptedRentals');
}

getReturnedRentalsCount() {
  return this.http.get<{ count: number }>('http://localhost:5276/api/Rental/CountReturnedRentals');
}

getRejectedRentalsCount() {
  return this.http.get<{ count: number }>('http://localhost:5276/api/Rental/CountRejectedRentals');
}

  // Fetch rentals by customer ID
  getRentalsByCustomer(customerId: number){
    return this.http.get<Rental[]>(`http://localhost:5276/api/Rental/GetRentalsByCustomer/${customerId}`);
  }

    // Process the return of a specific rental
    returnRental(rentalId: number){
      return this.http.put(`http://localhost:5276/api/Rental/ReturnRental/${rentalId}`, null);
    }

}


 