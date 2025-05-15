// File: frontend/src/app/recommendations/recommendations.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface RecommendationDto {
  title: string;
  reason: string;
}

@Component({
  standalone: true,
  selector: 'app-recommendations',
  imports: [CommonModule, FormsModule, HttpClientModule],  // ← import HttpClientModule
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {
  prompt = '';
  recommendations: RecommendationDto[] = [];
  rawResponse = '';
  error = '';

  constructor(private http: HttpClient) { }

  getRecommendations() {
    this.error = '';
    this.recommendations = [];
    this.rawResponse = '';

    this.http
      .post<RecommendationDto[] | { rawResponse: string } | { error: string }>(
        `${environment.apiUrl}/recommendations`,
        { prompt: this.prompt }
      )
      .subscribe({
        next: data => {
          if ('error' in data) {
            this.error = data.error;
          } else if (Array.isArray(data)) {
            this.recommendations = data;
          } else if ('rawResponse' in data) {
            this.rawResponse = data.rawResponse;
          }
        },
        error: err => {
          this.error = err.error?.error || 'Failed to get recommendations.';
        }
      });
  }
}
