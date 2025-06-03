// File: src/app/movies/movie-detail/movie-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../movie.service';

@Component({
  standalone: true,
  selector: 'app-movie-detail',
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: any;         // “any” so we can refer to userRating, masterRating, etc.
  error = '';
  selectedScore?: number;
  inWatchlist = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.error = 'No movie ID provided.';
      return;
    }
    const movieId = +idParam;

    // 1) Load the detailed movie object (which includes userRating, masterRating, etc.)
    this.movieService.getById(movieId).subscribe({
      next: (detail: any) => {
        this.movie = detail;

        // detail.userRating might be undefined or a number
        this.selectedScore = detail.userRating ?? undefined;

        // (Optional) Check watchlist membership:
        // this.movieService.getWatchlist().subscribe({
        //   next: (items) => {
        //     this.inWatchlist = items.some(i => i.movie.movieId === movieId);
        //   }
        // });
      },
      error: () => {
        this.error = 'Failed to load movie details.';
      }
    });
  }

  toggleWatchlist() {
    if (!this.movie?.movieId) {
      return;
    }

    if (this.inWatchlist) {
      this.movieService.removeFromWatchlist(this.movie.movieId).subscribe({
        next: () => (this.inWatchlist = false),
        error: () => console.error('Failed to remove from watchlist.')
      });
    } else {
      this.movieService.addToWatchlist(this.movie.movieId).subscribe({
        next: () => (this.inWatchlist = true),
        error: () => console.error('Failed to add to watchlist.')
      });
    }
  }

  submitRating() {
    if (!this.movie?.movieId || this.selectedScore == null) {
      return;
    }
    this.movieService.rateMovie(this.movie.movieId, this.selectedScore).subscribe({
      next: () => {
        this.movie.userRating = this.selectedScore;
      },
      error: () => console.error('Failed to submit rating.')
    });
  }

  clearRating() {
    if (!this.movie?.movieId) {
      return;
    }
    this.movieService.removeRating(this.movie.movieId).subscribe({
      next: () => {
        this.selectedScore = undefined;
        this.movie.userRating = undefined;
      },
      error: () => console.error('Failed to remove rating.')
    });
  }
}
