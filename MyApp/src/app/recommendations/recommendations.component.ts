import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService, RecommendationDto } from '../movies/movie.service';

@Component({
  standalone: true,
  selector: 'app-recommendations',
  imports: [CommonModule, FormsModule],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {

  prompt = '';
  recs: RecommendationDto[] = [];
  loading = false;
  error = '';

  constructor(private movies: MovieService) { }

  ask() {
    if (!this.prompt.trim()) return;
    this.loading = true;
    this.error = '';
    this.recs = [];

    this.movies.getRecommendations(this.prompt.trim()).subscribe({
      next: list => {
        this.recs = list;
        this.loading = false;
        if (!list.length) {
          this.error = 'No recommendations found.';
        }
      },
      error: (err) => {
        console.error('AI Recs error:', err);
        this.error = err.error?.error || 'AI service failed';
        this.loading = false;
      }
    });
  }
}
