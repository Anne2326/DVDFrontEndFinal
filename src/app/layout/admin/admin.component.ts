import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../Services/customer.service';
import { AdminService } from '../../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl:'./admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  addDvdForm: FormGroup;

  dvds: any[]=[];
  customers: any[]=[];
  searchText:any;

  showdashboard=true;
  showrental=false;
  showadddvd = false;
  showCustomers = false;
  showInventory = false;
  selectedFile: File | null = null;
filteredInventory: any;

searchdvd: string='';
searchcustomer: string='';


  
  constructor(private fb:FormBuilder,private customerservice:CustomerService,private adminservice:AdminService,private toastr:ToastrService,private router:Router){
  this.addDvdForm=this.fb.group({
    title: ['', Validators.required],
    director: ['', Validators.required],
    genre: ['', Validators.required],
    price:[null,Validators.required],
    
    releaseDate: ['', Validators.required],
    CopiesAvailable: [null, [Validators.required, Validators.min(1)]],
    imageUrl: ['', Validators.required]
   
  })
  }
    ngOnInit(): void {
      this.loadcustomers()
      this.loaddvds()
    }
  
    // Toggle section visibility
    showadddvds() {
      this.resetSections();
      this.showadddvd = true;
    }
  
  //this is show admin home page
    homepage(){
  this.resetSections();
  this.showdashboard=true
    }
  
  
    customersShow() {
      this.resetSections();
      this.showCustomers = true;
  
    }
  
    displayDVDs() {
      this.resetSections();
      this.showInventory = true;
      this.loaddvds()
    }
  
    resetSections() {
      this.showadddvd = false;
      this.showCustomers = false;
      this.showInventory = false;
      this.showdashboard=false;
      this.showrental=false;
    }
    reportsShow() {
      throw new Error('Method not implemented.');
      }
      returnShow() {
      throw new Error('Method not implemented.');
      }
      overdueShow() {
      throw new Error('Method not implemented.');
      }
      displayRentals() {
        this.resetSections();
        this.showrental=true
      }
  
  
      loadcustomers() {
        this.customerservice.getcustomers().subscribe((data) => {
          this.customers = data;
          console.log(this.customers)
        })
      }
  
      loaddvds(){
        this.adminservice.getalldvds().subscribe((data)=>{
          this.dvds=data;
          console.log(this.dvds)
        })
      }
  
      onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          this.selectedFile = input.files[0]; // Capture the file
        }
      }
  
      addDvd() {
        if (this.addDvdForm.invalid) {
          this.toastr.error('Please fill out all required fields', 'Validation Error');
          return;
        }
      
        const formData = new FormData();
      
        // Add form controls to FormData
        formData.append('Title', this.addDvdForm.get('title')?.value);
        formData.append('Director', this.addDvdForm.get('director')?.value);
        formData.append('Genre', this.addDvdForm.get('genre')?.value);
        formData.append('Price', this.addDvdForm.get('price')?.value);
        formData.append('ReleaseDate', this.addDvdForm.get('releaseDate')?.value);
        formData.append('CopiesAvailable', this.addDvdForm.get('CopiesAvailable')?.value);
       
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
      
      
      
      
        editDvd(arg0: any) {
          throw new Error('Method not implemented.');
          }
          deleteDvd(id:number) {
            if(confirm('Do you want to delete?')) {
              this.adminservice.deletedvd(id).subscribe(data => {        
                this.loaddvds();
              });
            }
            this.toastr.info('Dvd  is deleted')
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
  