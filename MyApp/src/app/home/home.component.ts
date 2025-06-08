import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HomeService, AdminRating, TrendingMovie } from './home.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featured: AdminRating[] = [];
  trending: TrendingMovie[] = [];

  loadingFeatured = true;
  loadingTrending = true;

  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  searchTerm = '';

  constructor(private homeSvc: HomeService, private router: Router) { }

  ngOnInit(): void {
    /* Glarky’s picks */
    this.homeSvc.getAdminRatings().subscribe({
      next: d => { this.featured = d; this.loadingFeatured = false; },
      error: () => this.loadingFeatured = false
    });
    /* Trending */
    this.homeSvc.getTrending().subscribe({
      next: d => { this.trending = d; this.loadingTrending = false; },
      error: () => this.loadingTrending = false
    });
  }

  /** View details */
  viewMovie(id: number): void {
    this.router.navigate(['/movies', id]);
  }

  /** Handle hero search */
  doSearch(ev: Event): void {
    ev.preventDefault();
    if (!this.searchTerm.trim()) return;
    this.router.navigate(['/movies'], { queryParams: { query: this.searchTerm } });
  }

  /** Utility for skeleton loops */
  skeleton(n: number): number[] { return Array.from({ length: n }); }
}
