import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  MovieService,
  Movie,
  PagedResponse,
  AdminRatingDto
} from '../movie.service';

@Component({
  standalone: true,
  selector: 'app-movie-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  /* data ----------------------------------------------------------------- */
  movies: Movie[] = [];
  adminMap: Record<number, number> = {};   // movieId → Glarky’s score

  /* querying state ------------------------------------------------------- */
  page = 1;
  pageSize = 24;
  total = 0;
  totalPages = 0;

  query = '';
  minRating?: number;
  maxRating?: number;

  /* ui state ------------------------------------------------------------- */
  loading = true;
  error = '';

  /* constants ------------------------------------------------------------ */
  img = (p: string) => `https://image.tmdb.org/t/p/w342${p}`;

  constructor(private moviesSvc: MovieService) { }

  /* lifecycle ------------------------------------------------------------ */
  ngOnInit(): void {
    this.fetchPage();
    this.moviesSvc.getAdminRatings().subscribe(r => {
      this.adminMap = Object.fromEntries(r.map(x => [x.movieId, x.score]));
    });
  }

  /* data fetch ----------------------------------------------------------- */
  private fetchPage(): void {
    this.loading = true;
    this.error = '';

    if (this.query.trim()) {
      this.moviesSvc.search(this.query.trim()).subscribe({
        next: list => {
          this.movies = list;
          this.total = list.length;
          this.totalPages = 1;
          this.page = 1;
          this.loading = false;
        },
        error: () => { this.error = 'Search failed'; this.loading = false; }
      });
    } else {
      this.moviesSvc
        .getMovies(this.page, this.pageSize, this.minRating, this.maxRating)
        .subscribe({
          next: (resp: PagedResponse<Movie>) => {
            this.movies = resp.items;
            this.total = resp.total;
            this.page = resp.page;
            this.pageSize = resp.pageSize;
            this.totalPages = Math.max(1, Math.ceil(resp.total / resp.pageSize));
            this.loading = false;
          },
          error: () => { this.error = 'Failed to load movies'; this.loading = false; }
        });
    }
  }

  /* handlers ------------------------------------------------------------- */
  apply(): void { this.page = 1; this.fetchPage(); }
  prev(): void { if (this.page > 1) { this.page--; this.fetchPage(); } }
  next(): void { if (this.page < this.totalPages) { this.page++; this.fetchPage(); } }

  /* helpers -------------------------------------------------------------- */
  skeleton(n: number) { return Array.from({ length: n }); }
}
