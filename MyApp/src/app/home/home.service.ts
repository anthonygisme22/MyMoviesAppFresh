// File: src/app/home/home.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

// DTO Interfaces (example—you may have your own)
export interface AdminRating {
  movieId: number;
  tmdbId: string;
  title: string;
  year: number;
  posterUrl: string;
  score: number;
}

export interface TrendingMovie {
  movieId: number;
  tmdbId: string;
  title: string;
  year: number;
  posterUrl: string;
  averageRating: number;
  ratingCount: number;
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  // BEFORE: private baseUrl = `${environment.apiUrl}/api/movies`;
  // AFTER:
  private baseUrl = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) { }

  getAdminRatings(): Observable<AdminRating[]> {
    // BEFORE: return this.http.get<AdminRating[]>(`${this.baseUrl}/api/movies/admin-ratings`);
    return this.http.get<AdminRating[]>(`${this.baseUrl}/admin-ratings`);
  }

  getTrending(): Observable<TrendingMovie[]> {
    // BEFORE: return this.http.get<TrendingMovie[]>(`${this.baseUrl}/api/movies/trending`);
    return this.http.get<TrendingMovie[]>(`${this.baseUrl}/trending`);
  }
}
