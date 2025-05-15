import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRatingsService, AdminRating } from './admin-ratings.service';

@Component({
  standalone: true,
  selector: 'app-admin-ratings',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-ratings.component.html',
  styleUrls: ['./admin-ratings.component.css']
})
export class AdminRatingsComponent implements OnInit {
  ratings: AdminRating[] = [];
  newMovieId?: number;
  newScore = 10;
  loading = true;
  error = '';

  constructor(private svc: AdminRatingsService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: data => { this.ratings = data; this.loading = false; },
      error: () => { this.error = 'Failed to load.'; this.loading = false; }
    });
  }

  add(): void {
    if (!this.newMovieId) return;
    this.svc.upsert(this.newMovieId, this.newScore).subscribe(() => this.load());
  }

  update(r: AdminRating): void {
    const val = prompt('New score for ' + r.movieTitle, r.score.toString());
    if (val !== null) {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) this.svc.upsert(r.movieId, parsed).subscribe(() => this.load());
    }
  }

  remove(r: AdminRating): void {
    if (confirm(`Delete rating for "${r.movieTitle}"?`)) {
      this.svc.delete(r.movieId).subscribe(() => this.load());
    }
  }
}
