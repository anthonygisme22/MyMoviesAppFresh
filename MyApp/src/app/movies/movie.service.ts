import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

//
// 1) Movie browsing (anonymous)
//
export interface Movie {
  movieId: number;
  tmdbId: string;
  title: string;
  posterUrl: string;
  averageRating: number;
  ratingCount: number;
  masterRating?: number; // Glarky’s rating if available
}

export interface MovieDetail {
  movieId: number;
  tmdbId: string;
  title: string;
  posterUrl: string;
  overview: string;
  cast: { name: string; character: string }[];
  userRating?: number;
  masterRating?: number;
}

export interface WatchlistItem {
  watchlistItemId: number;
  movie: Movie;
  addedAt: string;
}

export interface CastMember {
  name: string;
  character: string;
}

export interface PagedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

//
// DTOs for ratings & recommendations
//
export interface RatingDto {
  movieId: number;
  score: number;
  username: string;
}

export interface RecommendationDto {
  title: string;
  reason: string;
}

// Admin‐side Glarky’s picks type (returns full movie info + score)
export interface AdminRatingDto {
  movieId: number;
  tmdbId: string;
  title: string;
  posterUrl: string;
  score: number;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private baseUrl = `${environment.apiUrl}/api/movies`;
  private watchlistUrl = `${environment.apiUrl}/api/watchlist`;
  private ratingsUrl = `${environment.apiUrl}/api/ratings`;
  private adminUrl = `${environment.apiUrl}/api/admin-ratings`;
  private recUrl = `${environment.apiUrl}/api/recommendations`;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  // --------------------------------------
  // 1) Public Browsing Endpoints (No token)
  // --------------------------------------

  getMovies(
    page: number,
    pageSize: number,
    minRating?: number,
    maxRating?: number,
    search?: string
  ): Observable<PagedResponse<Movie>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (minRating != null) params = params.set('minRating', minRating.toString());
    if (maxRating != null) params = params.set('maxRating', maxRating.toString());
    if (search) params = params.set('search', search);

    return this.http.get<PagedResponse<Movie>>(this.baseUrl, { params });
  }

  getMovieById(movieId: number): Observable<MovieDetail> {
    // This endpoint requires authentication
    const headers = this.buildAuthHeaders();
    return this.http.get<MovieDetail>(`${this.baseUrl}/${movieId}`, { headers });
  }

  // --------------------------------------
  // 2) Watchlist (requires token)
  // --------------------------------------

  getWatchlist(): Observable<WatchlistItem[]> {
    const headers = this.buildAuthHeaders();
    return this.http.get<WatchlistItem[]>(this.watchlistUrl, { headers });
  }

  addToWatchlist(movieId: number): Observable<any> {
    const headers = this.buildAuthHeaders();
    return this.http.post(this.watchlistUrl, { MovieId: movieId }, { headers });
  }

  removeFromWatchlist(movieId: number): Observable<any> {
    const headers = this.buildAuthHeaders();
    return this.http.delete(`${this.watchlistUrl}/${movieId}`, { headers });
  }

  // --------------------------------------
  // 3) User Ratings (requires token)
  // --------------------------------------

  rateMovie(movieId: number, score: number): Observable<RatingDto> {
    const headers = this.buildAuthHeaders();
    return this.http.post<RatingDto>(this.ratingsUrl, { MovieId: movieId, Score: score }, { headers });
  }

  removeRating(movieId: number): Observable<any> {
    const userId = this.getUserId();
    const headers = this.buildAuthHeaders();
    return this.http.delete(`${this.ratingsUrl}/user/${userId}/movie/${movieId}`, { headers });
  }

  getUserRatings(userId: number): Observable<RatingDto[]> {
    const headers = this.buildAuthHeaders();
    return this.http.get<RatingDto[]>(`${this.ratingsUrl}/user/${userId}`, { headers });
  }

  // --------------------------------------
  // 4) Admin/Glarky’s Picks (requires token, Admin role)
  // --------------------------------------

  // Fetch Glarky’s current picks (full movie info + score)
  getAdminRatings(): Observable<AdminRatingDto[]> {
    const headers = this.buildAuthHeaders();
    return this.http.get<AdminRatingDto[]>(`${this.baseUrl}/admin-ratings`, { headers });
  }

  // Upsert (create/update) a Glarky’s rating
  upsertAdminRating(movieId: number, score: number): Observable<AdminRatingDto> {
    const headers = this.buildAuthHeaders();
    return this.http.post<AdminRatingDto>(this.adminUrl, { MovieId: movieId, Score: score }, { headers });
  }

  // --------------------------------------
  // 5) AI Recommendations (requires token)
  // --------------------------------------

  getRecommendations(prompt: string): Observable<RecommendationDto[] | { rawResponse: string }> {
    const headers = this.buildAuthHeaders();
    return this.http.post<RecommendationDto[] | { rawResponse: string }>(
      this.recUrl,
      { prompt },
      { headers }
    );
  }

  // --------------------------------------
  // 6) Helpers
  // --------------------------------------

  private buildAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  private getUserId(): number {
    const token = this.auth.getToken();
    if (!token) throw new Error('No token found');
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Number(payload.sub);
    } catch {
      throw new Error('Invalid token');
    }
  }
}
