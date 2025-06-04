import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, RatingDto } from '../movies/movie.service';
import { AuthService } from '../auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = '';
  userId       !: number;
  ratings: RatingDto[] = [];
  error = '';
  loading = true;

  constructor(
    private auth: AuthService,
    private movieSvc: MovieService
  ) { }

  ngOnInit(): void {
    const token = this.auth.getToken();
    if (!token) {
      this.error = 'Not logged in.';
      this.loading = false;
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.username = payload.unique_name || payload.name || '';
      this.userId = Number(payload.sub);
    } catch {
      this.error = 'Invalid token.';
      this.loading = false;
      return;
    }

    this.movieSvc.getUserRatings(this.userId).subscribe({
      next: (data) => {
        this.ratings = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching user ratings:', err);
        this.error = 'Failed to load your ratings.';
        this.loading = false;
      }
    });
  }

  removeRating(rating: RatingDto) {
    this.movieSvc.removeRating(rating.movieId).subscribe({
      next: () => {
        this.ratings = this.ratings.filter(r => r.movieId !== rating.movieId);
      },
      error: (err) => {
        console.error('Error removing rating:', err);
        this.error = 'Failed to remove rating.';
      }
    });
  }
}
