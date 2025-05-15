import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Movie {
  movieId?: number;
  tmdbId?: string;
  title: string;
  year: number;
  posterUrl: string;
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

export interface MovieDetail extends Movie {
  overview: string;
  cast: CastMember[];
  userRating?: number;
  masterRating?: number;
}

export interface PagedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private baseUrl = `${environment.apiUrl}/movies`;
  private watchlistUrl = `${environment.apiUrl}/watchlist`;
  private ratingsUrl = `${environment.apiUrl}/ratings`;

  constructor(private http: HttpClient) { }

  getMovies(
    page: number,
    pageSize: number,
    yearFrom?: number,
    yearTo?: number,
    minRating?: number,
    maxRating?: number
  ): Observable<PagedResponse<Movie>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    if (yearFrom != null) params = params.set('yearFrom', yearFrom.toString());
    if (yearTo != null) params = params.set('yearTo', yearTo.toString());
    if (minRating != null) params = params.set('minRating', minRating.toString());
    if (maxRating != null) params = params.set('maxRating', maxRating.toString());

    return this.http.get<PagedResponse<Movie>>(this.baseUrl, { params });
  }

  search(query: string) {
    return this.http.get<Movie[]>(
      `${this.baseUrl}/search?query=${encodeURIComponent(query)}`
    );
  }

  getById(id: number) {
    return this.http.get<MovieDetail>(`${this.baseUrl}/${id}`);
  }

  getWatchlist() {
    return this.http.get<WatchlistItem[]>(this.watchlistUrl);
  }

  addToWatchlist(movieId: number) {
    return this.http.post(this.watchlistUrl, { MovieId: movieId });
  }

  removeFromWatchlist(movieId: number) {
    return this.http.delete(`${this.watchlistUrl}/${movieId}`);
  }

  rateMovie(movieId: number, score: number) {
    return this.http.post(this.ratingsUrl, { MovieId: movieId, Score: score });
  }

  removeRating(movieId: number) {
    return this.http.delete(`${this.ratingsUrl}/${movieId}`);
  }
}
