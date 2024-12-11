import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.component';
import { DVD } from '../../layout/admin/admin.component';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
import { AdminService } from '../../Services/admin.service';
import { FavouriteService } from '../../Services/favourite.service';


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
  favorites: DVD[] = []
  customerid: number = 0;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private customerservice: CustomerService,
    private dvdservice: AdminService,
    private favoriteservice:FavouriteService
  ){}
  ngOnInit(): void {
    this.loaddvds();
    this.loadFavorites();
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
      console.log(this.dvds)
    });
  }


// This function is called when the "Rent Now" button is clicked
openRentModal(dvd: DVD): void {
  this.selectedDvd = dvd; // Set the selected DVD
  // Open the modal (use Bootstrap Modal methods if needed, depending on your setup)
  const modal = new bootstrap.Modal(document.getElementById('rentModal')!);
  modal.show();
}

 

loadFavorites(): void {
  const getcustomer = localStorage.getItem('customer'); // Retrieve the customer from localStorage
  if (getcustomer) {
    try {
      const customer = JSON.parse(getcustomer); // Parse the JSON string to an object
      if (customer.Id) {
        this.customerid = +customer.Id; // Assign the ID to customerid
      }
    } catch (error) {
      console.error('Error parsing customer data from localStorage:', error);
      this.toastr.error('Failed to retrieve customer data.', 'Error');
      return;
    }
  }

  this.favoriteservice.getFavoritesByUser(this.customerid).subscribe(
    (response) => {
      if (response.success) {
        this.favorites = response.data || []; // Update favorites list
        //this.toastr.success('Favorites loaded successfully.', 'Success');
      } else {
        this.toastr.warning(response.message, 'Warning');
      }
    },
    (error) => {
      this.toastr.error(
        error.error?.message || 'Failed to load favorites.',
        'Error'
      );
    }
  );
}

addFavorite(dvdId: number): void {
  this.favoriteservice.addFavorite(this.customerid, dvdId).subscribe(
    (response) => {
      if (response.success) {
        this.toastr.success(response.message, 'Success');
        this.loadFavorites(); // Refresh the favorites list
        this.closeModal(); // Close the modal
      } else {
        this.toastr.warning(response.message, 'Warning');
      }
    },
    (error) => {
      this.toastr.error(
        error.error?.message || 'Failed to add favorite.',
        'Error'
      );
    }
  );
}

// removeFavorite(dvdId: number): void {
//   this.favoriteservice.removeFavorite(this.customerid, dvdId).subscribe(
//     (response) => {
//       if (response.success) {
//         this.toastr.success(response.message, 'Success');
//         this.loadFavorites(); // Refresh the favorites list
//       } else {
//         this.toastr.warning(response.message, 'Warning');
//       }
//     },
//     (error) => {
//       this.toastr.error(
//         error.error?.message || 'Failed to remove favorite.',
//         'Error'
//       );
//     }
//   );
// }
removeFavorite(dvdId: number): void {
  this.favoriteservice.removeFavorite(this.customerid, dvdId).subscribe(
    (response) => {
      if (response.success) {
        this.toastr.success('DVD removed from favorites successfully.', 'Success');
        // Update the UI immediately by filtering out the removed item
        this.favorites = this.favorites.filter((dvd) => dvd.id !== dvdId);
      } else {
        this.toastr.warning(response.message || 'Failed to remove favorite.', 'Warning');
      }
    },
    (error) => {
      this.toastr.error(error.error?.message || 'Failed to remove favorite.', 'Error');
    }
  );
}




goToFavoritesPage() {
  // this.router.navigate(['/customer/manage-favourite'])
  this.router.navigate(['/customer/manage-favourite'], {
    state: { openModal: true } // Pass state to open the modal
  });
  }


// Close the modal after an action
closeModal(): void {
  const modal = new bootstrap.Modal(document.getElementById('rentModal')!);
  modal.hide();
}

   // Open the Favorites modal
   openFavoritesModal(): void {
    const modalElement = document.getElementById('favoritesModal')!;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  // Close the modal after an action
closefavouriteModal(): void {
  const modal = new bootstrap.Modal(document.getElementById('favoritesModal')!);
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


export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}