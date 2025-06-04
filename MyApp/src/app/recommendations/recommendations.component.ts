// File: MyApp/src/app/recommendations/recommendations.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../movies/movie.service';

interface RecommendationDto {
  title: string;
  reason: string;
}

// The backend sometimes returns RecommendationDto[], or if parsing failed, an object like { rawResponse: string }.
// We’ll model that “fallback” shape here.
interface RawResponseFallback {
  rawResponse: string;
}

@Component({
  standalone: true,
  selector: 'app-recommendations',
  imports: [CommonModule, FormsModule],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {
  promptText = '';
  // Either an array of RecommendationDto, or empty if we only got rawResponse text.
  recommendations: RecommendationDto[] = [];
  // If we get a fallback object, store its string here:
  rawResponseText = '';
  loading = false;
  error = '';

  constructor(private movieService: MovieService) { }

  submitPrompt() {
    if (!this.promptText.trim()) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.recommendations = [];
    this.rawResponseText = '';

    this.movieService.getRecommendations(this.promptText).subscribe({
      next: (data: any) => {
        console.log('Received recommendations:', data);

        // If it's an array of {title, reason}, put it straight into recommendations[]
        if (Array.isArray(data)) {
          this.recommendations = data as RecommendationDto[];
        }
        // Otherwise, if it has a rawResponse property, display that text
        else if (data && typeof data.rawResponse === 'string') {
          this.rawResponseText = (data as RawResponseFallback).rawResponse;
        }
        // If neither shape matched, display the entire JSON as a string
        else {
          this.rawResponseText = JSON.stringify(data, null, 2);
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Recommendation API error:', err);
        if (err.error?.error) {
          this.error = err.error.error;
        } else {
          this.error = 'Failed to fetch recommendations.';
        }
        this.loading = false;
      }
    });
  }
}
