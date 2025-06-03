// File: frontend/src/app/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HomeService, AdminRating, TrendingMovie } from './home.service';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featured: AdminRating[] = [];
  trending: TrendingMovie[] = [];
  loadingFeatured = true;
  loadingTrending = true;
  error = '';

  imageBaseUrl = environment.tmdbImageBaseUrl;

  constructor(
    private homeSvc: HomeService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.homeSvc.getAdminRatings().subscribe({
      next: data => {
        this.featured = data;
        this.loadingFeatured = false;
      },
      error: () => {
        this.error = 'Failed to load Glarky’s top picks.';
        this.loadingFeatured = false;
      }
    });

    this.homeSvc.getTrending().subscribe({
      next: data => {
        this.trending = data;
        this.loadingTrending = false;
      },
      error: () => {
        this.error = 'Failed to load trending movies.';
        this.loadingTrending = false;
      }
    });
  }

  viewMovie(id: number): void {
    this.router.navigate(['/movies', id]);
  }
}
