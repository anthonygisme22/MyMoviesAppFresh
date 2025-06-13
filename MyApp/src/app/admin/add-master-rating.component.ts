import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { MovieService } from '../movies/movie.service';

@Component({
  standalone: true,
  selector: 'app-add-master-rating',
  templateUrl: './add-master-rating.component.html',
  styleUrls: ['./add-master-rating.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddMasterRatingComponent {

  form: FormGroup;
  saved = false;                 // ← flag for “Success!” banner
  error = '';                    // ← optional error message

  constructor(
    private fb: FormBuilder,
    private movies: MovieService
  ) {
    this.form = this.fb.group({
      tmdbId: ['', Validators.required],
      score: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.saved = false;          // clear previous message
    this.error = '';

    const tmdbId = String(this.form.value.tmdbId).trim();
    const score = Number(this.form.value.score);

    this.movies
      .addMasterRating({ tmdbId, score })
      .subscribe({
        next: () => {
          this.form.reset();
          this.saved = true;
          setTimeout(() => (this.saved = false), 3000);  // auto‑hide after 3 s
        },
        error: err => {
          this.error = err?.error ?? 'Save failed';
          setTimeout(() => (this.error = ''), 4000);
        }
      });
  }
}
