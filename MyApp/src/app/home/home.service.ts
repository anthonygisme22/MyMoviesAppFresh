// File: MyApp/src/app/home/home.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminRating {
  movieId: number;
  tmdbId: string;
  title: string;
  posterUrl: string;
  score: number;
}

export interface TrendingDto {
  movieId: number;
  tmdbId: string;
  title: string;
  posterUrl: string;
  averageRating: number;
  ratingCount: number;
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  // Force the full URL so we don’t accidentally hit index.html
  private baseUrl = 'http://localhost:5091/api/movies';

  constructor(private http: HttpClient) { }

  getAdminRatings(): Observable<AdminRating[]> {
    return this.http.get<AdminRating[]>(`${this.baseUrl}/admin-ratings`);
  }

  getTrending(): Observable<TrendingDto[]> {
    return this.http.get<TrendingDto[]>(`${this.baseUrl}/trending`);
  }
}
