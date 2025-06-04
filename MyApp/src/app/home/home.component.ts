import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HomeService, AdminRating, TrendingMovie } from './home.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,    // Provides *ngIf, *ngFor, etc.
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // This will hold your personal top-rated movies
  featured: AdminRating[] = [];

  // TMDb trending movies
  trending: TrendingMovie[] = [];

  // Loading indicators
  loadingFeatured = true;
  loadingTrending = true;

  // Generic error message
  error = '';

  // Base URL for poster images from TMDb
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private homeSvc: HomeService, private router: Router) { }

  ngOnInit(): void {
    // 1) Load “Glarky’s Top Picks” from your personal ratings
    this.homeSvc.getAdminRatings().subscribe({
      next: (data) => {
        this.featured = data;
        this.loadingFeatured = false;
      },
      error: () => {
        this.error = 'Failed to load Glarky’s Top Picks.';
        this.loadingFeatured = false;
      }
    });

    // 2) Load TMDb “Trending Now”
    this.homeSvc.getTrending().subscribe({
      next: (data) => {
        this.trending = data;
        this.loadingTrending = false;
      },
      error: () => {
        this.error = 'Failed to load Trending Movies.';
        this.loadingTrending = false;
      }
    });
  }

  // When user clicks a card, navigate to /movies/{id}
  viewMovie(id: number): void {
    this.router.navigate(['/movies', id]);
  }
}
