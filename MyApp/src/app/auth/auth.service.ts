import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private base = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient, private router: Router) { }

  /* ---------- state helpers ---------------------------- */
  isLoggedIn() { return !!localStorage.getItem('token'); }
  getUsername() { return localStorage.getItem('username') ?? ''; }
  isAdmin() { return localStorage.getItem('role') === 'Admin'; }

  /* ---------- API calls -------------------------------- */
  register(username: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.base}/register`, { username, password })
      .pipe(catchError(err => throwError(() => err.error || 'Registration failed')));
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.base}/login`, { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', username);
          const role = JSON.parse(atob(res.token.split('.')[1]))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          if (role) localStorage.setItem('role', role);
        })
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  /* add these two one‑liners inside the AuthService class */

  /** legacy helper for code that still calls auth.getToken() */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** legacy helper for code that still calls auth.getRole() */
  getRole(): string {
    return localStorage.getItem('role') ?? '';
  }

}
