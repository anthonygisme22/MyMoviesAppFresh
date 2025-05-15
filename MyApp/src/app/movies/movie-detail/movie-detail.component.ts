/* File: frontend/src/app/movies/movie-detail/movie-detail.component.ts */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieDetail, MovieService } from '../movie.service';

@Component({
  standalone: true,
  selector: 'app-movie-detail',
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie?: MovieDetail;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'No movie ID provided.';
      return;
    }
    const movieId = +id; // convert string to number

    this.movieService.getById(movieId).subscribe({
      next: (m) => (this.movie = m),
      error: () => (this.error = 'Failed to load movie details.')
    });
  }
}
