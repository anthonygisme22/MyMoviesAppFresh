import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ← Adjust this path: go up two levels to reach movies/movie.service
import { MovieService, AdminRatingDto } from '../../movies/movie.service';

@Component({
  standalone: true,
  selector: 'app-admin-ratings',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-ratings.component.html',
  styleUrls: ['./admin-ratings.component.css']
})
export class AdminRatingsComponent implements OnInit {
  masterRatings: AdminRatingDto[] = [];
  newMovieId: number | null = null;
  newScore: number | null = null;
  loading: boolean = true;
  error: string = '';

  constructor(private movieSvc: MovieService) { }

  ngOnInit(): void {
    this.loadMasterRatings();
  }

  loadMasterRatings() {
    this.loading = true;
    this.movieSvc.getAdminRatings().subscribe({
      next: (data) => {
        this.masterRatings = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading admin ratings:', err);
        this.error = 'Failed to load Glarky’s picks.';
        this.loading = false;
      }
    });
  }

  upsertRating() {
    if (this.newMovieId == null || this.newScore == null) {
      this.error = 'Enter both Movie ID and Score.';
      return;
    }
    if (this.newScore < 1 || this.newScore > 100) {
      this.error = 'Score must be between 1 and 100.';
      return;
    }
    this.error = '';
    this.movieSvc.upsertAdminRating(this.newMovieId, this.newScore).subscribe({
      next: (updated) => {
        const idx = this.masterRatings.findIndex(r => r.movieId === updated.movieId);
        if (idx > -1) {
          this.masterRatings[idx] = updated;
        } else {
          this.masterRatings.push(updated);
        }
        this.newMovieId = null;
        this.newScore = null;
      },
      error: (err) => {
        console.error('Error upserting admin rating:', err);
        this.error = 'Failed to save Glarky’s rating.';
      }
    });
  }
}
