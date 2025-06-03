// File: src/app/movies/movie-list/movie-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MovieService, Movie } from '../movie.service';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-movie-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  error = '';
  imageBaseUrl = environment.tmdbImageBaseUrl;

  page = 1;
  pageSize = 25;
  totalItems = 0;
  totalPages = 0;
  yearFrom?: number;
  yearTo?: number;
  minRating?: number;
  maxRating?: number;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(): void {
    this.error = '';
    this.movieService
      .getMovies(
        this.page,
        this.pageSize,
        this.yearFrom,
        this.yearTo,
        this.minRating,
        this.maxRating
      )
      .subscribe({
        next: (data) => {
          this.movies = data.items;
          this.totalItems = data.total;
          this.page = data.page;
          this.pageSize = data.pageSize;
          this.totalPages = Math.ceil(data.total / data.pageSize);
        },
        error: () => {
          this.error = 'Failed to load movies.';
        }
      });
  }

  applyFilters(): void {
    this.page = 1;
    this.loadPage();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadPage();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadPage();
    }
  }
}
