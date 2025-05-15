import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, WatchlistItem } from '../movie.service';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-watchlist',
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlist: WatchlistItem[] = [];
  loading = true;
  error = '';
  imageBaseUrl = environment.tmdbImageBaseUrl;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loading = true;
    this.movieService.getWatchlist().subscribe({
      next: data => {
        this.watchlist = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load watchlist.';
        this.loading = false;
      }
    });
  }

  remove(id: number): void {
    this.movieService.removeFromWatchlist(id).subscribe({
      next: () => {
        this.watchlist = this.watchlist.filter(w => w.movie.movieId !== id);
      },
      error: () => console.error('Failed to remove from watchlist')
    });
  }
}
