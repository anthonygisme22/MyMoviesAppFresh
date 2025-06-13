/* ------------------------------------------------------------------
   Central API wrapper for the Angular app
   ----------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

/* ── DTOs ─────────────────────────────────────────────────────────── */
export interface Movie {
  movieId: number;
  tmdbId: string;
  title: string;
  posterUrl: string;
  averageRating: number;
  ratingCount: number;
}
export interface CastMember { name: string; character: string; }

export interface MovieDetail {
  movieId: number;
  tmdbId: string;
  title: string;
  posterUrl: string;
  overview: string;
  cast: CastMember[];

  userRating?: number;
  masterRating?: number;

  runtime?: number;
  genres?: string[];
  criticScore?: number;
  audienceScore?: number;
  director?: string;
  composer?: string;
  backdrops?: string[];
  distribution?: number[];
  providers?: string[];
}

export interface TrailerDto { name: string; youtubeKey: string; }
export interface SimilarMovie { movieId: number; title: string; posterUrl: string; }

export interface AdminRatingDto { movieId: number; tmdbId: string; title: string; posterUrl: string; score: number; }
export interface RatingDto { movieId: number; score: number; username: string; }
export interface PagedResponse<T> { items: T[]; total: number; page: number; pageSize: number; }
export interface WatchlistItem { watchlistItemId: number; movie: Movie; addedAt: string; }
export interface RecommendationDto { title: string; reason: string; }

/* ── Service ─────────────────────────────────────────────────────────── */
@Injectable({ providedIn: 'root' })
export class MovieService {

  private base = `${environment.apiUrl}/api/movies`;
  private watch = `${environment.apiUrl}/api/watchlist`;
  private rate = `${environment.apiUrl}/api/ratings`;

  private adminList = `${environment.apiUrl}/api/movies/admin-ratings`; // GET
  private adminUpsert = `${environment.apiUrl}/api/admin/ratings`;        // POST

  private reco = `${environment.apiUrl}/api/recommendations`;

  constructor(private http: HttpClient) { }

  /* ---------- list / search ------------------------------------------ */
  getMovies(p: number, ps: number, min?: number, max?: number) {
    let q = new HttpParams().set('page', p).set('pageSize', ps);
    if (min != null) q = q.set('minRating', min); if (max != null) q = q.set('maxRating', max);
    return this.http.get<PagedResponse<Movie>>(this.base, { params: q });
  }
  search(term: string) { return this.http.get<Movie[]>(`${this.base}/search?query=${encodeURIComponent(term)}`); }

  /* ---------- details ------------------------------------------------- */
  getMovieById(id: number): Observable<MovieDetail> {
    return this.http.get<any>(`${this.base}/${id}`).pipe(
      map(api => {
        const d = api.details ?? api.Details ?? api;
        return {
          movieId: api.movieId ?? d.movieId ?? id,
          tmdbId: d.tmdbId ?? d.TmdbId,
          title: d.title ?? d.Title,
          posterUrl: d.posterUrl ?? d.posterPath ?? d.PosterPath ?? '',
          overview: d.overview ?? '',
          cast: d.cast ?? [],

          userRating: api.userRating ?? d.userRating,
          masterRating: api.masterRating ?? d.masterRating,

          runtime: d.runtime,
          genres: d.genres,
          criticScore: d.criticScore,
          audienceScore: d.audienceScore,
          director: d.director,
          composer: d.composer,
          backdrops: d.backdrops,
          distribution: d.distribution,
          providers: d.providers
        } as MovieDetail;
      })
    );
  }

  /* ---------- NEW helper calls for detail page ----------------------- */
  getTrailers(id: number) { return this.http.get<TrailerDto[]>(`${this.base}/${id}/trailers`); }
  getSimilar(id: number) { return this.http.get<SimilarMovie[]>(`${this.base}/${id}/similar`); }

  /* ---------- watch‑list --------------------------------------------- */
  getWatchlist() { return this.http.get<WatchlistItem[]>(this.watch); }
  addToWatchlist(id: number) { return this.http.post(this.watch, { MovieId: id }); }
  removeFromWatchlist(id: number) { return this.http.delete(`${this.watch}/${id}`); }

  /* ---------- ratings ------------------------------------------------- */
  rateMovie(id: number, score: number) {
    return this.http.post<RatingDto>(this.rate, { MovieId: id, Score: score });
  }
  removeRating(id: number) {
    return this.http.delete(`${this.rate}/user/${this.getUserId()}/movie/${id}`);
  }
  getUserRatings(uid: number) {
    return this.http.get<RatingDto[]>(`${environment.apiUrl}/api/ratings/user/${uid}`);
  }

  /* ---------- admin ratings ------------------------------------------ */
  /* ---------- admin ratings ------------------------------------------ */
  getAdminRatings() {
    return this.http.get<AdminRatingDto[]>(this.adminList);
  }

  /** Add or update Glarky’s score using a TMDb numeric id. */
  addMasterRating(p: { tmdbId: string; score: number }) {
    return this.http.post<{ movieId: number }>(
      `${this.adminUpsert}/tmdb`,          //  <-- use /tmdb helper
      { tmdbId: p.tmdbId, score: p.score }
    );
  }

  upsertAdminRating(id: number, score: number) {
    return this.http.post<AdminRatingDto>(this.adminUpsert, { movieId: id, score });
  }

  /* ---------- AI ------------------------------------------------------ */
  /* ---------- AI ------------------------------------------------------ */
  /* ---------- AI ------------------------------------------------------ */
  getRecommendations(prompt: string) {
    return this.http.post<RecommendationDto[] | { rawResponse: string }>(
      `${this.reco}`,
      { prompt }                              //  <-- matches DTO "Prompt"
    ).pipe(
      map(res => {
        // If we already have an array, return it.
        if (Array.isArray(res)) return res as RecommendationDto[];

        // Otherwise try to parse rawResponse (controller's fallback).
        try {
          return JSON.parse(res.rawResponse) as RecommendationDto[];
        } catch {
          return []; // graceful empty list on bad JSON
        }
      })
    );
  }



  /* helper */
  private getUserId(): number {
    const t = localStorage.getItem('token')!;
    return Number(JSON.parse(atob(t.split('.')[1])).sub);
  }
}
