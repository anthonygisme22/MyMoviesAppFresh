import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, WatchlistItem } from '../movie.service';

@Component({
  standalone: true,
  selector: 'app-watchlist',
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlist: WatchlistItem[] = [];
  error = '';
  loading = true;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getWatchlist().subscribe({
      next: (data) => {
        this.watchlist = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load watchlist.';
        this.loading = false;
      }
    });
  }

  remove(item: WatchlistItem) {
    this.movieService.removeFromWatchlist(item.movie.movieId).subscribe({
      next: () => {
        this.watchlist = this.watchlist.filter(i => i.movie.movieId !== item.movie.movieId);
      },
      error: () => {
        this.error = 'Failed to remove from watchlist.';
      }
    });
  }
}
