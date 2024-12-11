import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http:HttpClient) { }

  addFavorite(userId: number, dvdId: number) {
    return this.http.post(`http://localhost:5276/api/Favorites/AddFavorite`, { userId, dvdId });
  }

  getFavoritesByUser(userId: number){
    return this.http.get<any[]>(`http://localhost:5276/api/Favorites/GetFavoritesByUser/${userId}`);
  }

  removeFavorite(userId: number, dvdId: number) {
    return this.http.delete(`http://localhost:5276/api/Favorites/RemoveFavorite`, {
      body: { userId, dvdId },
    });
  }
}
