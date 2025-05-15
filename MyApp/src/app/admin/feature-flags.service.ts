import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface FeatureFlag {
  featureFlagId: number;
  name: string;
  isEnabled: boolean;
}

@Injectable({ providedIn: 'root' })
export class FeatureFlagsService {
  private baseUrl = `${environment.apiUrl}/featureflags`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<FeatureFlag[]> {
    return this.http.get<FeatureFlag[]>(this.baseUrl);
  }

  update(id: number, isEnabled: boolean): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, { isEnabled });
  }
}
