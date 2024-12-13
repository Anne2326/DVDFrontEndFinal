import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DVD } from '../admin.component';
import { Rental } from '../../../customer/customer.component';
import { AdminService } from '../../../Services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

declare var bootstrap: any;


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
    @ViewChild('reportModal') editDvdModal!: ElementRef;
  
  inventory: DVD[] = [];
  rentals: Rental[] = [];
  currentDate: string = new Date().toLocaleDateString();
  location: any;
  reportModal:any

  constructor(private dvdservice:AdminService,private toatsr:ToastrService ,private router:Router
  ){}
  ngOnInit(): void {
    this.loadInventory();
    this.loadRentals();
    this.openReportModal()
  }
  loadInventory() {
    this.dvdservice.getalldvds().subscribe(
      (data) => {
        this.inventory = data;
      },
      (error) => {
        console.error('Error loading inventory:', error);
      }
    )

  }
  loadRentals() {
    this.dvdservice.getallrentals().subscribe((data) => {
      this.rentals = data;
    },
    (error) => {
      console.error('Error loading rentals:', error);
    }
  );
  }

  printReport(): void {
    window.print();
  }
  openReportModal(): void {
    const reportModal = new bootstrap.Modal(document.getElementById('reportModal'));
    reportModal.show();
  }


  goBack(): void {
    this.router.navigate(['/admin'])
  }

}
