import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Recommendation {
  title: string;
  year: number;
  reason: string;
}

@Injectable({ providedIn: 'root' })
export class RecommendationsService {
  private api = `${environment.apiUrl}/recommendations`;

  constructor(private http: HttpClient) { }

  getRecommendations(prompt: string): Observable<Recommendation[]> {
    return this.http.post<Recommendation[]>(this.api, { prompt });
  }
}
