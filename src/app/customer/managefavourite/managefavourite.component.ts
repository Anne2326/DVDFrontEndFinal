import { Component, OnInit } from '@angular/core';
import { DVD } from '../../layout/admin/admin.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FavouriteService } from '../../Services/favourite.service';

declare var bootstrap: any;

@Component({
  selector: 'app-managefavourite',
  templateUrl: './managefavourite.component.html',
  styleUrl: './managefavourite.component.css'
})
export class ManagefavouriteComponent implements OnInit{
  favorites: DVD[] = [];
  

  constructor(
    private favoriteService: FavouriteService,
    private toastr: ToastrService,
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    if (history.state?.openModal) {
      this.openModal();
    }
  }

  loadFavorites(): void {
    const customer = JSON.parse(localStorage.getItem('customer')!);
    if (customer && customer.Id) {
      this.favoriteService.getFavoritesByUser(customer.Id).subscribe(
        (response: any) => {
          this.favorites = response.data; // Assuming API returns { data: [...], success: true }
        },
        (error) => {
          this.toastr.error('Failed to load favorites', 'Error');
        }
      );
    }
  }

  // Method to remove DVD from favorites
  removeFavorite(dvdId: number): void {
    const customer = JSON.parse(localStorage.getItem('customer')!);
    if (customer && customer.Id) {
      this.favoriteService.removeFavorite(customer.Id, dvdId).subscribe(
        (response: any) => {
          if (response.success) {
            this.toastr.success('DVD removed from favorites successfully', 'Success');
            this.favorites = this.favorites.filter((dvd) => dvd.id !== dvdId); // Update favorites list
          } else {
            this.toastr.error('Failed to remove favorite', 'Error');
          }
        },
        (error) => {
          this.toastr.error(error.error?.message || 'Failed to remove favorite', 'Error');
        }
      );
    }
  }

  // Method to navigate back to the customer page
  goBack(): void {
    this.router.navigate(['/customer']); // Navigate to the customer page
  }

  openModal(): void {
    const modal = new bootstrap.Modal(document.getElementById('favoriteModal')!);
    modal.show();
  }

  // Method to close the modal
  closeModal(): void {
    const modalElement = document.getElementById('favoriteModal')!;
    const modal = new bootstrap.Modal(modalElement);
    modal.hide();
  }
}
