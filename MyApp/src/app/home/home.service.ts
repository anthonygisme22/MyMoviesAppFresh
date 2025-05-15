import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Movie } from '../movies/movie.service';

export interface AdminRating {
  movieId: number;
  tmdbId: string;
  title: string;
  year: number;
  posterUrl: string;
  score: number;
}

export interface TrendingMovie extends Movie {
  averageRating: number;
  ratingCount: number;
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  private api = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) { }

  getAdminRatings(): Observable<AdminRating[]> {
    return this.http.get<AdminRating[]>(`${this.api}/admin-ratings`);
  }

  getTrending(): Observable<TrendingMovie[]> {
    return this.http.get<TrendingMovie[]>(`${this.api}/trending`);
  }
}
