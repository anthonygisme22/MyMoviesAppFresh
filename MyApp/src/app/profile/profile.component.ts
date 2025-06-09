import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MovieService, RatingDto, MovieDetail
} from '../movies/movie.service';
import { AuthService } from '../auth/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  rows: { rating: RatingDto; movie: MovieDetail }[] = [];
  loading = true;
  error = '';

  constructor(private movies: MovieService,
    private auth: AuthService) { }

  ngOnInit(): void {

    const uid = Number(JSON.parse(
      atob(this.auth.getToken()!.split('.')[1])).sub);

    this.movies.getUserRatings(uid).subscribe({
      next: ratings => {
        if (ratings.length === 0) { this.loading = false; return; }

        /* fetch each movie by id in parallel */
        const calls = ratings.map(r =>
          this.movies.getMovieById(r.movieId));
        forkJoin(calls).subscribe({
          next: details => {
            this.rows = ratings.map((r, i) => ({ rating: r, movie: details[i] }));
            this.loading = false;
          },
          error: () => { this.error = 'Failed to load movies'; this.loading = false; }
        });
      },
      error: () => { this.error = 'Failed to load ratings'; this.loading = false; }
    });
  }
}
