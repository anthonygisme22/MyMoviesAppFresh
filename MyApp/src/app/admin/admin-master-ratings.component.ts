import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, AdminRatingDto } from '../movies/movie.service';

@Component({
  standalone: true,
  selector: 'app-admin-master-ratings',
  imports: [CommonModule],
  template: `
    <div class="pt-20 p-4 text-white">
      <h2 class="text-2xl font-bold mb-4">All Master Ratings</h2>

      <table class="min-w-full">
        <thead>
          <tr class="bg-gray-700">
            <th class="px-3 py-1">Poster</th>
            <!-- ▲▼ glyph hints sorting -->
            <th class="px-3 py-1 cursor-pointer" (click)="sort('title')">
              Name ▲▼
            </th>
            <th class="px-3 py-1 cursor-pointer" (click)="sort('score')">
              Score ▲▼
            </th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let r of masterRatings" class="border-b border-gray-700">
            <td class="px-3 py-1">
              <img [src]="thumb(r.posterUrl)" class="w-10">
            </td>
            <td class="px-3 py-1">{{ r.title }}</td>
            <td class="px-3 py-1">{{ r.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: []
})
export class AdminMasterRatingsComponent implements OnInit {
  masterRatings: AdminRatingDto[] = [];
  sortKey: keyof AdminRatingDto = 'title';

  constructor(private movies: MovieService) { }

  ngOnInit(): void {
    this.movies.getAdminRatings().subscribe(r => {
      this.masterRatings = r;
      this.sort('score');   // default sort
    });
  }

  sort(k: keyof AdminRatingDto) {
    this.sortKey = k;
    this.masterRatings.sort((a, b) =>
      a[k]! < b[k]! ? -1 : a[k]! > b[k]! ? 1 : 0);
  }

  thumb(p: string) { return `https://image.tmdb.org/t/p/w92${p}`; }
}
