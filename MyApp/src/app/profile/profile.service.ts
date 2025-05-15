import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Rating {
  ratingId: number;
  movieId: number;
  movieTitle: string;
  score: number;
  ratedAt: string;
}

export interface AdminRating {
  movieId: number;
  tmdbId: string;
  title: string;
  year: number;
  posterUrl: string;
  score: number;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private ratingsUrl = `${environment.apiUrl}/ratings`;
  private adminRatings = `${environment.apiUrl}/movies/admin-ratings`;

  constructor(private http: HttpClient) { }

  getMyRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.ratingsUrl);
  }

  getMasterRatings(): Observable<AdminRating[]> {
    return this.http.get<AdminRating[]>(this.adminRatings);
  }

  importRatingsCsv(file: File): Observable<void> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<void>(`${this.ratingsUrl}/csv-import`, form);
  }
}
