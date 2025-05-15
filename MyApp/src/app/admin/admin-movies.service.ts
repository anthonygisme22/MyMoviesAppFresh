import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface AdminCreateDto {
  title: string;
  tmdbId?: string;
  year: number;
  posterUrl: string;
  score: number;
}

@Injectable({ providedIn: 'root' })
export class AdminMoviesService {
  private url = `${environment.apiUrl}/movies/admin-create`;

  constructor(private http: HttpClient) { }

  createAndRate(dto: AdminCreateDto): Observable<{ movieId: number }> {
    return this.http.post<{ movieId: number }>(this.url, dto);
  }
}
