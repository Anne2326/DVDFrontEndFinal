import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../Services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { DVD } from '../admin.component';



declare var bootstrap: any;

@Component({
  selector: 'app-editdvd',
  templateUrl: './editdvd.component.html',
  styleUrl: './editdvd.component.css'
})
export class EditdvdComponent {

  editDvdForm: FormGroup;
  @ViewChild('editDvdModal') editDvdModal!: ElementRef;

  dvdId: number =0;
showeditform:boolean= false;
modalInstance: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dvdService: AdminService,
    private router: Router,
    private toastr:ToastrService
  ) {
    this.editDvdForm = this.fb.group({
      title: [''],
      price: [0],
      copiesAvailable: [0],
      director: [{ value: '', disabled: true }],
      genre: [{ value: '', disabled: true }],
    });
  }

  ngOnInit() {
    // Get DVD ID from route
    this.dvdId = Number(this.route.snapshot.paramMap.get('id'));
  
    // Fetch DVD details and populate the form
    if (this.dvdId) {
      this.dvdService.getsingledvd(this.dvdId).subscribe((dvd) => {
        this.editDvdForm.patchValue(dvd); // Patch the rest of the form
        this.openModal(); // Open modal once data is ready
      });
    }
  }
  

  //Update DVD
  // updateDvd() {
  //   if (this.editDvdForm.valid && this.dvdId) {
  //     const updatedDvd = this.editDvdForm.value;
  //     console.log('updatedvd:' ,updatedDvd)
  //     this.dvdService.editdvd(updatedDvd).subscribe({
  //       next: () => {
  //         this.toastr.success('Dvd update Suceesfully!')
  //         this.closeModal()
  //         this.router.navigate(['/admin']); // Redirect to AdminComponent
  //       },
  //       error: (err) => alert('Error updating DVD: ' + err),
  //     });
  //   }
  // }

  updateDvd(): void {
    if (this.editDvdForm.invalid) {
      this.toastr.error('Please fill all required fields', 'Validation Error');
      return;
    }

    const updatedData = this.editDvdForm.value;
    updatedData.id = this.dvdId;

    this.dvdService.updateDvd(updatedData).subscribe({
      next: () => {
        this.toastr.success('DVD updated successfully', 'Success');
        this.router.navigate(['/admin']);
        this.closeModal()
      },
      error: (err) => {
        this.toastr.error(err.error || 'Failed to update DVD', 'Error');
      },
    });
  }
  

  selectedFile: File | null = null;

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
}

  
  

  // Open modal
  openModal() {
    this.modalInstance = new bootstrap.Modal(this.editDvdModal.nativeElement);
    this.modalInstance.show();
  }

  // Close modal
  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.router.navigate(['/admin'])
    }
  }


}
