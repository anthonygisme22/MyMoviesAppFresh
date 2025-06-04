import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService, MovieDetail } from '../movie.service';

@Component({
  standalone: true,
  selector: 'app-movie-detail',
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie?: MovieDetail;
  loading = true;
  error = '';
  selectedScore?: number;
  inWatchlist = false;
  watchlist: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.error = 'No movie ID provided.';
      this.loading = false;
      return;
    }
    const movieId = +idParam;

    // Fetch movie details. If not found, catch 404 and show a friendly message.
    this.movieService.getMovieById(movieId).subscribe({
      next: (m) => {
        this.movie = m;
        this.selectedScore = m.userRating ?? undefined;
        this.loadWatchlist();
        this.loading = false;
      },
      error: (err) => {
        // If API returned 404, show “Movie not found”; otherwise log & show generic error.
        if (err.status === 404) {
          this.error = `Movie #${movieId} not found.`;
        } else {
          console.error('Error fetching movie details:', err);
          this.error = 'An unexpected error occurred.';
        }
        this.loading = false;
      }
    });
  }

  private loadWatchlist() {
    this.movieService.getWatchlist().subscribe({
      next: (items) => {
        this.watchlist = items.map(i => i.movie.movieId);
        this.inWatchlist = this.movie
          ? this.watchlist.includes(this.movie.movieId)
          : false;
      },
      error: () => {
        // ignore errors retrieving watchlist
        this.inWatchlist = false;
      }
    });
  }

  toggleWatchlist() {
    if (!this.movie) return;

    if (this.inWatchlist) {
      this.movieService.removeFromWatchlist(this.movie.movieId).subscribe({
        next: () => this.inWatchlist = false,
        error: () => { /* ignore failure */ }
      });
    } else {
      this.movieService.addToWatchlist(this.movie.movieId).subscribe({
        next: () => this.inWatchlist = true,
        error: () => { /* ignore failure */ }
      });
    }
  }

  submitRating() {
    if (!this.movie || this.selectedScore == null) return;

    this.movieService.rateMovie(this.movie.movieId, this.selectedScore).subscribe({
      next: () => {
        if (this.movie) {
          this.movie.userRating = this.selectedScore!;
        }
      },
      error: () => {
        // ignore rating errors
      }
    });
  }

  removeRating() {
    if (!this.movie) return;

    this.movieService.removeRating(this.movie.movieId).subscribe({
      next: () => {
        if (this.movie) {
          this.movie.userRating = undefined;
          this.selectedScore = undefined;
        }
      },
      error: () => {
        // ignore
      }
    });
  }
}
