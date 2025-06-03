// File: frontend/src/app/movies/watchlist/watchlist.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MovieService, WatchlistItem } from '../movie.service';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-watchlist',
  imports: [CommonModule, RouterModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlist: WatchlistItem[] = [];
  error = '';
  imageBaseUrl = environment.tmdbImageBaseUrl;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadWatchlist();
  }

  /** Fetch all WatchlistItems for the logged‐in user */
  loadWatchlist(): void {
    this.movieService.getWatchlist().subscribe({
      next: (items) => (this.watchlist = items),
      error: () => (this.error = 'Failed to load watchlist.')
    });
  }

  /** Navigate to the detail page for a given movie */
  viewMovie(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }

  /** Remove a single item from the watchlist */
  removeItem(item: WatchlistItem): void {
    this.movieService.removeFromWatchlist(item.movie.movieId).subscribe({
      next: () => this.loadWatchlist(),
      error: () => (this.error = 'Failed to remove from watchlist.')
    });
  }
}
