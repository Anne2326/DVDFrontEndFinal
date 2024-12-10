import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../Services/customer.service';
import { AdminService } from '../Services/admin.service';
import { DVD } from '../layout/admin/admin.component';

function emailContainsAt(control: AbstractControl) {
  const email = control.value;
  if (email && !email.includes('@')) {
    return { emailNoAt: true }; // Return error if '@' is missing
  }
  return null; // Return null if validation passes
}

export interface Customer {
  id: number; // Unique identifier for the customer
  userName: string;
  phoneNumber: string;
  email: string;
  nic: string; // National ID card number
  password: string;
  Role: string; // Password for the customer account
  rentals?: Rental[]; // Collection of rentals (optional)
  isActive?: boolean; // Indicates if the customer is active (optional)
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

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {

  onSubmit() {
    
  }

  editProfile: FormGroup;
  isDisabled = false;
  fulldisabled=true;

  searchText: string = '';

  rentals: Rental[] = [];
  dvds: DVD[] = [];
  customers: Customer[] = [];

  customerid: number = 0;

  showdashboard = false;
  showreview = false;
  showrental = false;
  showprofile = false;
  showcomment = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private customerservice: CustomerService,
    private dvdservice: AdminService
  ) {
    this.editProfile = this.fb.group({
      id:[],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      nic: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.loaddvds();
    
      this.editProfile = this.fb.group({
        id: [{ value: '', disabled: true }],
        userName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        nic: [{ value: '', disabled: true }],
      });
    
      this.fetchCustomerDetails()
  }

 
 
  profile() {
    this.resetSections();
    console.log('hi show profile');
    this.showprofile = true;
  }

  Rentals() {
    this.resetSections();
    this.showrental = true;
  }

  resetSections() {
    this.showreview = false;
    this.showprofile = false;
    this.showcomment = false;
    this.showdashboard = false;
    this.showrental = false;
  }

  onEdit() {
    if (this.editProfile.valid) {
      this.toastr.success(' Edit Your Form Successfully', 'Success');
    } else {
      this.toastr.error('Please fill in the form correctly', 'Error');
    }
  }

  rentalhistory() {
    const getcustomer = localStorage.getItem('customer'); // Retrieve the customer from localStorage
    if (getcustomer) {
      try {
        const customer = JSON.parse(getcustomer);
        console.log(customer.Id); // Parse the JSON string to an object
        if (customer.Id) {
          this.customerid = +customer.Id; // Assign the ID to cusId
          console.log(this.customerid);
        }
      } catch (error) {
        console.error('Error parsing customer data from localStorage:', error);
        this.toastr.error('Failed to retrieve customer history.', 'Error');
        return;
      }
    }
    this.customerservice.getrentalbycus(this.customerid).subscribe(data=>{
      this.rentals=data
      console.log(this.rentals)
    })
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
      },
      error: (error) => {
        console.error('Error during rental:', error);
        this.toastr.error('Failed to rent DVD. Please try again.', 'Error');
      },
    });
  }

  fetchCustomerDetails() {
    const getcustomer = localStorage.getItem('customer'); // Retrieve the customer from localStorage
    if (getcustomer) {
      try {
        const customer = JSON.parse(getcustomer);
        console.log(customer.Id); // Parse the JSON string to an object
        if (customer.Id) {
          this.customerid = +customer.Id; // Assign the ID to cusId
          console.log(this.customerid);
        }
      } catch (error) {
        console.error('Error parsing customer data from localStorage:', error);
        this.toastr.error('Failed to retrieve customer history.', 'Error');
        return;
      }
    }
    this.customerservice.getsinglecus(this.customerid).subscribe(data=>{
      this.editProfile.patchValue(data);
      console.log(data)
    })
    }

    enableEdit() {
      this.isDisabled = true;
      this.editProfile.get('userName')?.enable();
      this.editProfile.get('email')?.enable();
      this.editProfile.get('phoneNumber')?.enable();
    }

    onSaveDetails() {
      if (this.editProfile.valid) {
        const profileData = this.editProfile.getRawValue();
        this.customerservice.updateCustomerProfile(profileData).subscribe(
          (response) => {
            this.toastr.success('Profile updated successfully!');
            this.isDisabled = true;
          },
          (error) => {
            if (error.status === 400) {
              this.toastr.warning('Username or Email already exists.');
            } else {
              this.toastr.warning('An error occurred. Please try again.');
            }
          }
        );
      }
    }

  loaddvds() {
    this.dvdservice.getalldvds().subscribe((data) => {
      this.dvds = data;
    });
  }

  logout(){
     // Remove session-specific data
  localStorage.removeItem('token');
  localStorage.removeItem('customer');

  console.log('Logged out, but customer and token are preserved.');

    this.router.navigate(['/'])
  }
}
