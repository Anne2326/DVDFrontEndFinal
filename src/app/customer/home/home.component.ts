import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.component';
import { DVD } from '../../layout/admin/admin.component';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
import { AdminService } from '../../Services/admin.service';


declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  dvds: DVD[] = [];
  selectedDvd!: DVD;
  searchText: string = '';
  rentals: Rental[] = [];
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private customerservice: CustomerService,
    private dvdservice: AdminService
  ){}
  ngOnInit(): void {
    this.loaddvds();
  }

  Rent(dvd: DVD) {
    const getcustomer = localStorage.getItem('customer'); // Retrieve the customer from localStorage
    console.log(getcustomer);
    let cusId: number; // Initialize cusId

    if (getcustomer) {
      try {
        const customer = JSON.parse(getcustomer);
        console.log(customer.Id); // Parse the JSON string to an object
        if (customer.Id) {
          cusId = +customer.Id; // Assign the ID to cusId
          console.log(cusId);
        } else {
          this.toastr.error('Invalid customer data.', 'Error');
          return;
        }
      } catch (error) {
        console.error('Error parsing customer data from localStorage:', error);
        this.toastr.error('Failed to retrieve customer information.', 'Error');
        return;
      }
    } else {
      this.toastr.error('You must be logged in to rent a DVD.', 'Error');
      return;
    }

    // Validate if the DVD has copies available
    if (dvd.copiesAvailable <= 0) {
      this.toastr.error(
        `The DVD "${dvd.title}" is out of stock and cannot be rented.`,
        'Error'
      );
      return;
    }

    // Construct the rental request
    const rentalRequest = {
      customerId: cusId, // Use the assigned customer ID
      dvdId: dvd.id,
      rentalDate: new Date().toISOString(),
    };

    // Call the service to handle the rental request
    this.customerservice.addrental(rentalRequest).subscribe({
      next: (response) => {
        console.log('Rental successful:', response);
        this.toastr.success('Rent Successful!', 'Success');
        this.closeModal()
      },
      error: (error) => {
        console.error('Error during rental:', error);
        this.toastr.error('Failed to rent DVD. Please try again.', 'Error');
      },
    });
  }

  loaddvds() {
    this.dvdservice.getalldvds().subscribe((data) => {
      this.dvds = data;
    });
  }


// This function is called when the "Rent Now" button is clicked
openRentModal(dvd: DVD): void {
  this.selectedDvd = dvd; // Set the selected DVD
  // Open the modal (use Bootstrap Modal methods if needed, depending on your setup)
  const modal = new bootstrap.Modal(document.getElementById('rentModal')!);
  modal.show();
}
addToFavorites(): void {
  this.toastr.info('The movie has been added to your favorites!', 'Added to Favorites');
  this.closeModal();
}

// Close the modal after an action
closeModal(): void {
  const modal = new bootstrap.Modal(document.getElementById('rentModal')!);
  modal.hide();
}


}

export interface Rental {
  rentalId: number; // Unique identifier for the rental
  customerId: number; // ID of the customer who rented the DVD
  dvdId: number; // ID of the rented DVD
  rentalDate: Date; // Date when the rental was created
  returnDate?: Date; // Optional: Date when the rental was returned
  isOverdue?: boolean; // Optional: Indicates if the rental is overdue (defaults to false)
  status: string;
  customer?: Customer;
  dvd?: DVD;
  // Status of the rental (e.g., "Pending")
}
