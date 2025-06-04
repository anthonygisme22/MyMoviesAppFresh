import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AdminRating {
  movieId: number;
  tmdbId: string;
  title: string;
  posterUrl: string;
  score: number;
}

export interface TrendingMovie {
  movieId: number;
  tmdbId: string;
  title: string;
  posterUrl: string;
  averageRating: number;
  ratingCount: number;
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  private baseUrl = `${environment.apiUrl}/api/movies`;

  constructor(private http: HttpClient) { }

  getAdminRatings(): Observable<AdminRating[]> {
    return this.http.get<AdminRating[]>(`${this.baseUrl}/admin-ratings`);
  }

  getTrending(): Observable<TrendingMovie[]> {
    return this.http.get<TrendingMovie[]>(`${this.baseUrl}/trending`);
  }
}
