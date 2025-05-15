import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface AdminRating {
  movieId: number;
  movieTitle: string;
  score: number;
}

@Injectable({ providedIn: 'root' })
export class AdminRatingsService {
  private api = `${environment.apiUrl}/admin/ratings`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<AdminRating[]> {
    return this.http.get<AdminRating[]>(this.api);
  }

  upsert(movieId: number, score: number): Observable<void> {
    return this.http.post<void>(this.api, { movieId, score });
  }

  delete(movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${movieId}`);
  }
}
