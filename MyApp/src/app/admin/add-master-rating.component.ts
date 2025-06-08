// src/app/admin/add-master-rating.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../movies/movie.service';

@Component({
  standalone: true,
  selector: 'app-add-master-rating',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <section class="p-6 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Add / Update Master Rating</h2>

    <form [formGroup]="form" (ngSubmit)="save()" class="flex flex-col gap-4">
      <label class="form-control">
        <span class="label-text">TMDB ID</span>
        <input type="number" formControlName="tmdbId"
               class="input input-bordered" min="1" required>
      </label>

      <label class="form-control">
        <span class="label-text">Score (1‑100)</span>
        <input type="number" formControlName="score"
               class="input input-bordered" min="1" max="100" required>
      </label>

      <button type="submit"
              class="btn btn-primary"
              [disabled]="form.invalid || saving">
        {{ saving ? 'Saving…' : 'Save' }}
      </button>
    </form>
  </section>
  `
})
export class AddMasterRatingComponent {
  form: FormGroup;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private movies: MovieService,
    private router: Router
  ) {
    // initialise form *after* fb is injected
    this.form = this.fb.nonNullable.group({
      tmdbId: [0, [Validators.required, Validators.min(1)]],
      score: [0, [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  save() {
    if (this.form.invalid) return;
    this.saving = true;

    // getRawValue() has correct {tmdbId,score} shape
    this.movies.addMasterRating(this.form.getRawValue())
      .subscribe({
        next: () => this.router.navigate(['/admin/master-ratings']),
        error: () => this.saving = false
      });
  }
}
