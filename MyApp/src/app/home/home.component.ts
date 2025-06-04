// File: MyApp/src/app/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HomeService, AdminRating, TrendingDto } from './home.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featured: AdminRating[] = [];
  trending: TrendingDto[] = [];
  loadingFeatured = true;
  loadingTrending = true;
  errorMsg = '';

  // Make router public so the template can access it
  constructor(private homeSvc: HomeService, public router: Router) { }

  ngOnInit(): void {
    // Fetch Glarky’s Top Picks
    this.homeSvc.getAdminRatings().subscribe({
      next: data => {
        this.featured = data;
        this.loadingFeatured = false;
      },
      error: () => {
        this.errorMsg = 'Unable to load Glarky’s Top Picks.';
        this.loadingFeatured = false;
      }
    });

    // Fetch Trending Now
    this.homeSvc.getTrending().subscribe({
      next: data => {
        this.trending = data;
        this.loadingTrending = false;
      },
      error: () => {
        this.errorMsg = 'Unable to load Trending Now.';
        this.loadingTrending = false;
      }
    });
  }

  viewMovie(movieId: number, tmdbId: string): void {
    if (movieId && movieId > 0) {
      this.router.navigate(['/movies', movieId]);
    } else {
      // fallback: open TMDb page in new tab
      window.open(`https://www.themoviedb.org/movie/${tmdbId}`, '_blank');
    }
  }
}
