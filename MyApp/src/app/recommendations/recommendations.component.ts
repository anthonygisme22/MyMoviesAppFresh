// File: src/app/recommendations/recommendations.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';      // ← Import FormsModule for [(ngModel)]
import { MovieService } from '../movies/movie.service';

@Component({
  standalone: true,
  selector: 'app-recommendations',
  imports: [CommonModule, FormsModule],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {
  promptText = '';
  recommendations: any[] = [];
  loading = false;
  error = '';

  constructor(private movieService: MovieService) { }

  submitPrompt(): void {
    this.error = '';
    this.loading = true;
    // For now, we have no backend route—show a placeholder error
    setTimeout(() => {
      this.error = 'AI recommendations are temporarily unavailable.';
      this.loading = false;
    }, 500);
  }
}
