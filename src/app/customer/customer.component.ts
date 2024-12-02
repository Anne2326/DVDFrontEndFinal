import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../Services/customer.service';

function emailContainsAt(control: AbstractControl) {
  const email = control.value;
  if (email && !email.includes('@')) {
    return { emailNoAt: true };  // Return error if '@' is missing
  }
  return null;  // Return null if validation passes



}

export interface Customer {
  Id: number; // Unique identifier for the customer
  userName: string; // Username of the customer
  PhoneNumber: string; // Phone number of the customer
  Email: string; // Email address of the customer
  NIC: string; // National ID card number
  password: string;
  Role:string; // Password for the customer account
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
  status?: string; 
  // Status of the rental (e.g., "Pending")
}







@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})






export class CustomerComponent implements OnInit {

   editProfile:FormGroup;
   
  searchText:string = '';

   rentals: any[]=[];
   dvds: any[]=[];
  // dvd:number;
   customers: any[]=[];

  showdashboard=true
  showreview = false;
  showrental=false;
  showprofile = false;
  showcomment = false;

 

    constructor(private fb: FormBuilder, private  toastr: ToastrService,private router:Router,private customerservice: CustomerService) {
      this.editProfile = new FormGroup({
        username: new FormControl(""),
      
        phonenumber: new FormControl(""),
        nic: new FormControl(""),
        email: new FormControl(""),
  
  
  
  
      })
    }

    ngOnInit(): void {

      this.editProfile = this.fb.group({
  
  
        username: ['', Validators.required],
  

        phonenumber: ['', [Validators.required,
       
        Validators.maxLength(10),
        Validators.minLength(10) //this validation not display in users check that
  
        ]],
        nic: ['', [Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
        ]
        ],
  
        email: ['', [Validators.required,
          emailContainsAt
        ]]
  
      })
  

    }




  customerhomepage() {
      this.resetSections();
      this.showdashboard = true;
    }
  
    review(){

   this.resetSections();
      this.showreview = true;
    }
    comment(){

      this.resetSections();
         this.showcomment = true;
       }
       profile(){

        this.resetSections();
           this.showprofile = true;
         }
     Rentals(){

          this.resetSections();
             this.showrental = true;
           
           }
           
                        
          







    resetSections() {
      this.showreview = false;
      this.showprofile = false;
      this.showcomment = false;
      this.showdashboard=false;
      this.showrental = false;
    }



    onEdit() {
      if (this.editProfile.valid) {
        
        this.toastr.success(" Edit Your Form Successfully", "Success");
  
     
      } else {
        
        this.toastr.error("Please fill in the form correctly", "Error");
      }
    }
  
    Rent(){
      this.toastr.success("Rent Successfully ", "Success");



    }


  



}





