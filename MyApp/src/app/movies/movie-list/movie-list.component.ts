import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MovieService, Movie, PagedResponse } from '../movie.service';
import { HomeService, AdminRating } from '../../home/home.service';
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

  // Pagination state
  page = 1;
  pageSize = 25;
  totalItems = 0;
  totalPages = 0;

  // Filter fields
  titleQuery = '';
  minRating?: number;
  maxRating?: number;

  // Map of MovieId → Glarky’s (admin) score
  adminRatingsMap: { [movieId: number]: number } = {};

  constructor(
    private movieService: MovieService,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    // Load the first page and Glarky’s ratings on startup
    this.loadPage();
    this.loadAdminRatings();
  }

  // Decide between paged listing vs. title‐search
  loadPage(): void {
    this.error = '';

    // If there's a non‐empty titleQuery, perform a search
    if (this.titleQuery && this.titleQuery.trim() !== '') {
      this.movieService.search(this.titleQuery.trim()).subscribe({
        next: (results: Movie[]) => {
          // Display search results—no pagination applied
          this.movies = results;
          this.totalItems = results.length;
          this.page = 1;
          this.pageSize = results.length;
          this.totalPages = 1;
        },
        error: () => {
          this.error = 'Failed to search for movies.';
        }
      });
    } else {
      // Otherwise, fetch a paged, filtered list
      this.movieService
        .getMovies(this.page, this.pageSize, this.minRating, this.maxRating)
        .subscribe({
          next: (data: PagedResponse<Movie>) => {
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
  }

  // Called by the “Apply” button (filter or search)
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

  // Fetch Glarky’s (admin) ratings once, storing in a map
  loadAdminRatings(): void {
    this.homeService.getAdminRatings().subscribe({
      next: (data: AdminRating[]) => {
        this.adminRatingsMap = {};
        data.forEach(r => {
          this.adminRatingsMap[r.movieId] = r.score;
        });
      },
      error: () => {
        // If admin‐ratings fail, leave map empty
      }
    });
  }
}
