// File: src/app/admin/admin-master-ratings.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, AdminRatingDto } from '../movies/movie.service';

@Component({
  standalone: true,
  selector: 'app-admin-master-ratings',
  imports: [CommonModule],
  template: `
  <section class="p-6">
    <h2 class="text-2xl font-bold mb-4">Master Ratings</h2>

    <div class="overflow-x-auto">
      <table class="table table-zebra w-full min-w-[750px]">
        <thead>
          <tr>
            <th (click)="sort('movieId')">Movie ID</th>
            <th (click)="sort('movieTitle')">Name</th>
            <th (click)="sort('tmdbId')">TMDB ID</th>
            <th (click)="sort('score')">Rating <span *ngIf="sortKey==='score'">{{ dir==='asc'?'▲':'▼' }}</span></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let r of rows">
            <td>{{ r.movieId }}</td>
            <td>{{ r.movieTitle }}</td>
            <td>{{ r.tmdbId }}</td>
            <td>{{ r.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  `,
  styles: ['th{cursor:pointer;white-space:nowrap;}']
})
export class AdminMasterRatingsComponent implements OnInit {
  rows: AdminRatingDto[] = [];
  sortKey: keyof AdminRatingDto = 'score';
  dir: 'asc' | 'desc' = 'desc';

  constructor(private movies: MovieService) { }

  ngOnInit() {
    this.movies.getAdminRatings().subscribe(d => this.rows = [...d]);
  }

  sort(key: keyof AdminRatingDto) {
    if (this.sortKey === key) {
      this.dir = this.dir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.dir = 'asc';
    }
    const m = this.dir === 'asc' ? 1 : -1;
    this.rows.sort((a: any, b: any) =>
      (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0) * m);
  }
}
