import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService, WatchlistItem } from '../movie.service';

@Component({
  standalone: true,
  selector: 'app-watchlist',
  imports: [CommonModule, RouterModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  items: WatchlistItem[] = [];
  loading = true;
  error = '';

  img = (p: string) => `https://image.tmdb.org/t/p/w342${p}`;

  constructor(private movies: MovieService) { }

  ngOnInit(): void { this.reload(); }

  reload() {
    this.loading = true; this.error = '';
    this.movies.getWatchlist().subscribe({
      next: list => { this.items = list; this.loading = false; },
      error: () => { this.error = 'Failed to load watchlist'; this.loading = false; }
    });
  }

  remove(id: number) {
    this.movies.removeFromWatchlist(id).subscribe(() => this.reload());
  }

  sk(n = 12) { return Array.from({ length: n }); }
}
