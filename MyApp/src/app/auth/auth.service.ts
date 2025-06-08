// File: src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface JwtResponse { token: string }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly api = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) { }

  /* ─── Auth endpoints ───────────────────────────────────────────────────── */
  login(username: string, password: string): Observable<void> {
    return this.http
      .post<JwtResponse>(`${this.api}/login`, { username, password })
      .pipe(tap(r => localStorage.setItem(this.tokenKey, r.token)),
        map(() => void 0));
  }

  register(username: string, password: string): Observable<void> {
    return this.http
      .post<JwtResponse>(`${this.api}/register`, { username, password })
      .pipe(tap(r => localStorage.setItem(this.tokenKey, r.token)),
        map(() => void 0));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /* ─── Token helpers ────────────────────────────────────────────────────── */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private get payload(): Record<string, any> | null {
    const t = this.getToken();
    if (!t) return null;
    try { return JSON.parse(atob(t.split('.')[1])); }
    catch { return null; }
  }

  getUsername(): string | null {
    const p = this.payload;
    if (!p) return null;
    return (
      p.Username ??
      p.username ??
      p.unique_name ??      // Microsoft JWT default
      p.name ??
      null
    );
  }

  /** Return 'Admin' or 'User' depending on claims */
  getRole(): string | null {
    const p = this.payload;
    if (!p) return null;

    // Common patterns
    if (typeof p.role === 'string' && p.role.toLowerCase() === 'admin') return 'Admin';
    if (Array.isArray(p.roles) &&
      p.roles.some((r: string) => r.toLowerCase() === 'admin')) return 'Admin';

    // Claims with namespace
    const nsKey = Object.keys(p).find(k => k.endsWith('/role') || k.endsWith('/roles'));
    if (nsKey && typeof p[nsKey] === 'string' &&
      p[nsKey].toLowerCase() === 'admin') return 'Admin';

    // Fallback: username equals 'admin'
    if (this.getUsername()?.toLowerCase() === 'admin') return 'Admin';

    return 'User';
  }

  /** True if current user is admin */
  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
