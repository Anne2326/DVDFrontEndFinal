import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../customer/home/home.component';
import { Observable } from 'rxjs';
import { DVD } from '../layout/admin/admin.component';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http:HttpClient) { }

  // addFavorite(userId: number, dvdId: number) {
  //   return this.http.post(`http://localhost:5276/api/Favorites/AddFavorite`, { userId, dvdId });
  // }

  // getFavoritesByUser(userId: number){
  //   return this.http.get<any[]>(`http://localhost:5276/api/Favorites/GetFavoritesByUser/${userId}`);
  // }

  // removeFavorite(userId: number, dvdId: number) {
  //   return this.http.delete(`http://localhost:5276/api/Favorites/RemoveFavorite`, {
  //     body: { userId, dvdId },
  //   });
  // }


  getFavoritesByUser(userId: number): Observable<ApiResponse<DVD[]>> {
    return this.http.get<ApiResponse<DVD[]>>(`http://localhost:5276/api/Favorites/GetFavoritesByUser/${userId}`);
  }
  
  addFavorite(userId: number, dvdId: number): Observable<ApiResponse<null>> {
    const body = { userId, dvdId };
    return this.http.post<ApiResponse<null>>(`http://localhost:5276/api/Favorites/AddFavorite`, body);
  }
  
  removeFavorite(userId: number, dvdId: number): Observable<ApiResponse<null>> {
    const body = { userId, dvdId };
    return this.http.delete<ApiResponse<null>>(`http://localhost:5276/api/Favorites/RemoveFavorite`, { body });
  }
}
