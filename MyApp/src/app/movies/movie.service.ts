// File: src/app/movies/movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

/* ─── Shared DTOs ─────────────────────────────────────────────────────────── */
export interface Movie {
  movieId: number;
  tmdbId: string;
  title: string;
  posterUrl: string;
  averageRating: number;
  ratingCount: number;
}
export interface CastMember { name: string; character: string; }
export interface MovieDetail extends Movie {
  overview: string;
  cast: CastMember[];
  userRating?: number;
  masterRating?: number;
}
export interface AdminRatingDto {
  movieId: number;
  tmdbId: string;
  movieTitle: string;
  score: number;
}
export interface RatingDto {
  movieId: number;
  score: number;
  username: string;
}
export interface PagedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
export interface WatchlistItem {
  watchlistItemId: number;
  movie: Movie;
  addedAt: string;
}
export interface RecommendationDto { title: string; reason: string; }

/* ─── Service ─────────────────────────────────────────────────────────────── */
@Injectable({ providedIn: 'root' })
export class MovieService {

  private baseUrl = `${environment.apiUrl}/api/movies`;
  private watchlistUrl = `${environment.apiUrl}/api/watchlist`;
  private ratingsUrl = `${environment.apiUrl}/api/ratings`;
  private adminRatingsUrl = `${environment.apiUrl}/api/admin/ratings`;
  private recommendationsUrl = `${environment.apiUrl}/api/recommendations`;

  constructor(private http: HttpClient) { }

  /* Browse / search --------------------------------------------------------- */
  getMovies(page: number, pageSize: number,
    minRating?: number, maxRating?: number):
    Observable<PagedResponse<Movie>> {

    let params = new HttpParams()
      .set('page', page).set('pageSize', pageSize);
    if (minRating != null) params = params.set('minRating', minRating);
    if (maxRating != null) params = params.set('maxRating', maxRating);

    return this.http.get<PagedResponse<Movie>>(this.baseUrl, { params });
  }

  search(query: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/search?query=${encodeURIComponent(query)}`);
  }

  /* Details ----------------------------------------------------------------- */
  getMovieById(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.baseUrl}/${id}`);
  }

  /* Watch‑list -------------------------------------------------------------- */
  getWatchlist(): Observable<WatchlistItem[]> {
    return this.http.get<WatchlistItem[]>(this.watchlistUrl);
  }
  addToWatchlist(movieId: number) {
    return this.http.post(this.watchlistUrl, { MovieId: movieId });
  }
  removeFromWatchlist(movieId: number) {
    return this.http.delete(`${this.watchlistUrl}/${movieId}`);
  }

  /* User ratings ------------------------------------------------------------ */
  rateMovie(movieId: number, score: number) {
    return this.http.post<RatingDto>(this.ratingsUrl, { MovieId: movieId, Score: score });
  }
  removeRating(movieId: number) {
    return this.http.delete(`${this.ratingsUrl}/user/${this.getUserId()}/movie/${movieId}`);
  }
  getUserRatings(userId: number) {
    return this.http.get<RatingDto[]>(`${this.ratingsUrl}/user/${userId}`);
  }

  /* ─── NEW: Admin (master) ratings ───────────────────────────────────────── */
  /** GET /api/admin/ratings */
  getAdminRatings(): Observable<AdminRatingDto[]> {
    return this.http.get<AdminRatingDto[]>(this.adminRatingsUrl);
  }
  /** POST /api/admin/ratings  (body: { movieId, score }) */
  upsertAdminRating(movieId: number, score: number) {
    return this.http.post(this.adminRatingsUrl, { movieId, score });
  }
  /** POST /api/admin/ratings/tmdb (body: { tmdbId, score }) */
  addMasterRating(req: { tmdbId: number; score: number }) {
    return this.http.post<{ movieId: number }>(`${this.adminRatingsUrl}/tmdb`, req);
  }

  /* AI recommendations ------------------------------------------------------ */
  getRecommendations(prompt: string) {
    return this.http.post<RecommendationDto[]>(this.recommendationsUrl, { prompt });
  }

  /* Helpers ----------------------------------------------------------------- */
  private getUserId(): number {
    const token = localStorage.getItem('token')!;
    return +JSON.parse(atob(token.split('.')[1])).sub;
  }
}
