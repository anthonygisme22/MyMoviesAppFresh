import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminMoviesService } from './admin-movies.service';

@Component({
  standalone: true,
  selector: 'app-admin-movies',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-movies.component.html',
  styleUrls: ['./admin-movies.component.css']
})
export class AdminMoviesComponent {
  error = '';
  success = '';

  constructor(private svc: AdminMoviesService) { }

  onSubmit(f: NgForm): void {
    if (f.invalid) return;
    const dto = f.value;
    this.svc.createAndRate(dto).subscribe({
      next: res => {
        this.success = `Movie added (ID: ${res.movieId}) and rated!`;
        this.error = '';
        f.resetForm();
      },
      error: () => {
        this.error = 'Failed to add movie.';
        this.success = '';
      }
    });
  }
}
