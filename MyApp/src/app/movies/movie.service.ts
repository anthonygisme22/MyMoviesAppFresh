import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

//
// ─── TYPES EXPORTED FOR OTHER COMPONENTS ─────────────────────────────────────
//

// Movie returned by paged listing or search
export interface Movie {
  movieId: number;
  tmdbId: string;
  title: string;
  posterUrl: string;
  averageRating: number;
  ratingCount: number;
}

// Detailed movie (used by MovieDetailComponent)
export interface CastMember {
  name: string;
  character: string;
}

export interface MovieDetail {
  movieId: number;
  tmdbId: string;
  title: string;
  posterUrl: string;
  overview: string;
  cast: CastMember[];
  userRating?: number;   // logged-in user’s rating
  masterRating?: number; // Glarky’s (admin) rating
}

// For displaying “Glarky’s Top Picks” in AdminRatingsComponent
export interface AdminRatingDto {
  movieId: number;
  tmdbId: string;
  title: string;
  posterUrl: string;
  score: number;
}

// For displaying user’s own ratings in ProfileComponent
export interface RatingDto {
  movieId: number;
  score: number;
  username: string;
}

// The shape returned by the paged GET /api/movies endpoint
export interface PagedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// A watchlist entry (used in WatchlistComponent)
export interface WatchlistItem {
  watchlistItemId: number;
  movie: Movie;
  addedAt: string;
}

// AI Recommendation DTO (used in RecommendationsComponent)
export interface RecommendationDto {
  title: string;
  reason: string;
}

//
// ─── SERVICE IMPLEMENTATION ────────────────────────────────────────────────────
//
@Injectable({ providedIn: 'root' })
export class MovieService {
  private baseUrl = `${environment.apiUrl}/api/movies`;
  private watchlistUrl = `${environment.apiUrl}/api/watchlist`;
  private ratingsUrl = `${environment.apiUrl}/api/ratings`;
  private adminRatingsUrl = `${environment.apiUrl}/api/admin-ratings`;
  private recommendationsUrl = `${environment.apiUrl}/api/recommendations`;

  constructor(private http: HttpClient) { }

  //
  // ─── BROWSE / SEARCH / PAGINATION ────────────────────────────────────────────
  //

  /**
   * GET /api/movies?page=&pageSize=&minRating=&maxRating=
   * Returns a paged list of Movie (with averageRating and ratingCount).
   */
  getMovies(
    page: number,
    pageSize: number,
    minRating?: number,
    maxRating?: number
  ): Observable<PagedResponse<Movie>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (minRating != null) {
      params = params.set('minRating', minRating.toString());
    }
    if (maxRating != null) {
      params = params.set('maxRating', maxRating.toString());
    }

    return this.http.get<PagedResponse<Movie>>(this.baseUrl, { params });
  }

  /**
   * GET /api/movies/search?query=...
   * Returns an array of Movie matching title (local + TMDb fallback).
   */
  search(query: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${this.baseUrl}/search?query=${encodeURIComponent(query)}`
    );
  }

  //
  // ─── MOVIE DETAILS ────────────────────────────────────────────────────────────
  //

  /**
   * GET /api/movies/{id}
   * Returns MovieDetail (local + TMDb cast + userRating + masterRating).
   */
  getMovieById(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.baseUrl}/${id}`);
  }

  //
  // ─── USER WATCHLIST ───────────────────────────────────────────────────────────
  //

  /**
   * GET /api/watchlist
   * Returns WatchlistItem[] for the logged‐in user.
   */
  getWatchlist(): Observable<WatchlistItem[]> {
    return this.http.get<WatchlistItem[]>(this.watchlistUrl);
  }

  /**
   * POST /api/watchlist {MovieId}
   * Adds a movie to the logged‐in user's watchlist.
   */
  addToWatchlist(movieId: number): Observable<any> {
    return this.http.post(this.watchlistUrl, { MovieId: movieId });
  }

  /**
   * DELETE /api/watchlist/{movieId}
   * Removes a movie from the logged‐in user's watchlist.
   */
  removeFromWatchlist(movieId: number): Observable<any> {
    return this.http.delete(`${this.watchlistUrl}/${movieId}`);
  }

  //
  // ─── USER RATINGS ─────────────────────────────────────────────────────────────
  //

  /**
   * POST /api/ratings { MovieId, Score }
   * Upsert (create/update) a rating for the logged‐in user.
   */
  rateMovie(movieId: number, score: number): Observable<RatingDto> {
    return this.http.post<RatingDto>(this.ratingsUrl, { MovieId: movieId, Score: score });
  }

  /**
   * DELETE /api/ratings/user/{userId}/movie/{movieId}
   * Removes the logged‐in user’s rating for that movie.
   */
  removeRating(movieId: number): Observable<any> {
    return this.http.delete(`${this.ratingsUrl}/user/${this.getUserId()}/movie/${movieId}`);
  }

  /**
   * GET /api/ratings/user/{userId}
   * Returns all ratings by a specific user. Used in ProfileComponent.
   */
  getUserRatings(userId: number): Observable<RatingDto[]> {
    return this.http.get<RatingDto[]>(`${environment.apiUrl}/api/ratings/user/${userId}`);
  }

  //
  // ─── ADMIN (GLARKY) RATINGS ───────────────────────────────────────────────────
  //

  /**
   * GET /api/admin-ratings
   * Returns all of Glarky’s ratings (does not depend on logged‐in user).
   */
  getAdminRatings(): Observable<AdminRatingDto[]> {
    return this.http.get<AdminRatingDto[]>(this.adminRatingsUrl);
  }

  /**
   * POST /api/admin-ratings { movieId, score }
   * Upsert (create/update) a master rating for Glarky (Admin).
   */
  upsertAdminRating(movieId: number, score: number): Observable<AdminRatingDto> {
    return this.http.post<AdminRatingDto>(this.adminRatingsUrl, { movieId, score });
  }

  //
  // ─── AI RECOMMENDATIONS ───────────────────────────────────────────────────────
  //

  /**
   * POST /api/recommendations { prompt }
   * Returns RecommendationDto[] from OpenAI.
   */
  getRecommendations(prompt: string): Observable<RecommendationDto[]> {
    return this.http.post<RecommendationDto[]>(this.recommendationsUrl, { prompt });
  }

  //
  // ─── HELPERS ──────────────────────────────────────────────────────────────────
  //

  // Read the JWT from local storage and parse “sub” as userId
  private getUserId(): number {
    const token = this.getToken()!;
    return Number(JSON.parse(atob(token.split('.')[1])).sub);
  }

  // Retrieve the stored JWT
  private getToken(): string | null {
    return localStorage.getItem('token');
  }
}
