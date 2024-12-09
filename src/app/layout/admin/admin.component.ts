import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../Services/customer.service';
import { AdminService } from '../../Services/admin.service';
import { Router } from '@angular/router';
import { Customer, Rental } from '../../customer/customer.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
customerId: number=0;

  addDvdForm: FormGroup;

  dvds: DVD[] = [];
  customers: Customer[] = [];
  searchText: any;
  rentals: Rental[] = [];
  acceptedRentalsCount: number = 0;
  returnedRentalsCount: number = 0;
  rejectedRentalsCount: number = 0;

  showdashboard = true;
  showrental = false;
  showadddvd = false;
  showCustomers = false;
  showInventory = false;
  showreturn=false;
  showTable: boolean = false;


  selectedFile: File | null = null;
  filteredInventory: any;

  searchdvd: string = '';
  searchcustomer: string = '';

  constructor(
    private fb: FormBuilder,
    private customerservice: CustomerService,
    private adminservice: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.addDvdForm = this.fb.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      genre: ['', Validators.required],
      price: [null, Validators.required],

      releaseDate: ['', Validators.required],
      CopiesAvailable: [null, [Validators.required, Validators.min(1)]],
      imageUrl: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.loadcustomers();
    this.loaddvds();
    this.getrentals();
    this.loadAcceptedRentalsCount();
    this.loadRejectedRentalsCount();
    this.loadReturnedRentalsCount(); 
  }

  // Toggle section visibility
  showadddvds() {
    this.resetSections();
    this.showadddvd = true;
  }

  //this is show admin home page
  homepage() {
    this.resetSections();
    this.showdashboard = true;
    this.loadcustomers();
    this.loaddvds();
    this.getrentals();
    this.loadAcceptedRentalsCount();
    this.loadRejectedRentalsCount();
    this.loadReturnedRentalsCount(); 

  }

  customersShow() {
    this.resetSections();
    this.showCustomers = true;
  }

  displayDVDs() {
    this.resetSections();
    this.showInventory = true;
    this.loaddvds();
  }

  resetSections() {
    this.showadddvd = false;
    this.showCustomers = false;
    this.showInventory = false;
    this.showdashboard = false;
    this.showrental = false;
    this.showreturn=false
  }
  reportsShow() {
    throw new Error('Method not implemented.');
  }
  returnShow() {
    this.resetSections()
    this.showreturn=true
  }

  overdueShow() {
    throw new Error('Method not implemented.');
  }

  displayRentals() {
    this.resetSections();
    this.showrental = true;
    this.getrentals();
  }

  loadcustomers() {
    this.customerservice.getcustomers().subscribe((data) => {
      this.customers = data;
      console.log(this.customers);
    });
  }

  loaddvds() {
    this.adminservice.getalldvds().subscribe((data) => {
      this.dvds = data;
      console.log(this.dvds);
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Capture the file
    }
  }

  addDvd() {
    if (this.addDvdForm.invalid) {
      this.toastr.error(
        'Please fill out all required fields',
        'Validation Error'
      );
      return;
    }

    const formData = new FormData();

    // Add form controls to FormData
    formData.append('Title', this.addDvdForm.get('title')?.value);
    formData.append('Director', this.addDvdForm.get('director')?.value);
    formData.append('Genre', this.addDvdForm.get('genre')?.value);
    formData.append('Price', this.addDvdForm.get('price')?.value);
    formData.append(
      'CopiesAvailable',
      this.addDvdForm.get('CopiesAvailable')?.value
    );

    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile, this.selectedFile.name);
    } else {
      this.toastr.error('Please select an image file.', 'Validation Error');
      return;
    }

    const releaseDate = new Date(this.addDvdForm.get('releaseDate')?.value);
    formData.append('releaseDate', releaseDate.toISOString());

    this.adminservice.createdvd(formData).subscribe({
      next: (response) => {
        this.toastr.success('DVD added successfully', 'Success');
        this.addDvdForm.reset();
      },
      error: (err) => {
        this.toastr.error(err.error || 'Failed to add DVD', 'Error');
      },
    });
  }

  editDvd(id:number) {
    this.router.navigate(['/admin/Edit',id])
     
  }
  deleteDvd(id: number) {
    if (confirm('Do you want to delete?')) {
      this.adminservice.deletedvd(id).subscribe((data) => {
        this.loaddvds();
      });
    }
    this.toastr.info('Dvd  is deleted');
  }

  getrentals() {
    this.adminservice.getallrentals().subscribe((data) => {
      this.rentals = data;
      console.log(this.rentals);
    });
  }

// Return a specific DVD
// In your Angular component, you can call this service method when the user triggers the return DVD action:
returnRental(rentalId: number) {
  this.adminservice.returnRental(rentalId).subscribe(
      (response) => {
          console.log('Rental returned successfully', response);
          this.toastr.success('DVD returned successfully');
          setTimeout(() => {
            this.router.navigate(['/admin']);
        }, 0);
      },
      (error) => {
          console.error('Error returning rental', error);
          this.toastr.error('Failed to return DVD');
      }
  );
}
  rejectAction(id: number) {
    this.adminservice.rejectrental(id).subscribe(
      (response: any) => {
        // Handle JSON response
        this.toastr.success(response.message, 'Success');
        this.getrentals();
      },
      (error) => {
        // Handle JSON error response
        const errorMessage =
          error.error?.message || 'An unexpected error occurred.';
        this.toastr.error(errorMessage, 'Error');
      }
    );
  }

  acceptAction(id: number): void {
    this.adminservice.acceptRental(id).subscribe({
      next: (data) => {
        console.log(data);
        // Assuming `data` contains rental information, including the DVD title
        const movieName = data;
        this.toastr.success(`Rental accepted successfully"!`, 'Success');
        this.getrentals();
      },
      error: (err) => {
        console.error('Error accepting rental:', err);
        this.toastr.error(
          'Failed to accept the rental. Please try again.',
          'Error'
        );
      },
    });
  }
  loadAcceptedRentalsCount() {
    this.adminservice.getAcceptedRentalsCount().subscribe(
      (response: { count: number }) => {
        this.acceptedRentalsCount = response.count;
      },
      (error) => {
        console.error('Failed to fetch accepted rentals count:', error);
      }
    );
  }
  loadReturnedRentalsCount() {
    this.adminservice.getReturnedRentalsCount().subscribe(
      (response: { count: number }) => {
        this.returnedRentalsCount = response.count;
      },
      (error) => {
        console.error('Failed to fetch returned rentals count:', error);
      }
    );
  }

  loadRejectedRentalsCount() {
    this.adminservice.getRejectedRentalsCount().subscribe(
      (response: { count: number }) => {
        this.rejectedRentalsCount = response.count;
      },
      (error) => {
        console.error('Failed to fetch rejected rentals count:', error);
      }
    );
  }

    // Fetch rentals for a specific customer
    fetchRentals() {
      this.adminservice.getRentalsByCustomer(this.customerId).subscribe({
        next: (data) => {
          this.rentals = data;
          this.showTable = true;
        },
        error: (err) => {
          this.toastr.error(err.error.message || 'no rentals found for the provided Customerid  Or Alredy returned.');
          this.showTable = false;
        },
      });
    }

}

export interface DVD {
  imageUrl: any;
  id: number; // Unique identifier
  title?: string; // Title of the DVD (optional)
  director?: string; // Director's name (optional)
  genre?: string; // Genre of the DVD (optional)
  price: number; // Price of the DVD
  releaseDate: Date; // Release date
  copiesAvailable: number; // Number of copies available
  imagePath?: string; // Path to the image (optional)
}
