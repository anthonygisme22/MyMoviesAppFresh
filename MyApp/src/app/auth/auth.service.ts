// File: MyMoviesApp.Client/src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';

  // We'll call /auth endpoints on the .NET server:
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap(res => {
          // Store token in Local Storage for later use
          localStorage.setItem(this.tokenKey, res.token);
        })
      );
  }

  register(username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/register`, { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem(this.tokenKey, res.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      // Decode the middle part of the JWT
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  getUsername(): string | null {
    const payload = this.getPayload();
    // ClaimTypes.Name often gets stored as "unique_name" or "name" depending on your server
    return payload?.unique_name ?? payload?.name ?? null;
  }

  getRole(): string | null {
    const payload = this.getPayload();
    return payload?.role ?? null;
  }
}
