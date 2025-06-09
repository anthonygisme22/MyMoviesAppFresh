import {
  Component, OnInit, HostListener
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MovieService,
  MovieDetail,
  TrailerDto,
  SimilarMovie
} from '../movie.service';

@Component({
  standalone: true,
  selector: 'app-movie-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  /* data ---------------------------------------------------------------- */
  movie?: MovieDetail;
  trailers: TrailerDto[] = [];
  similar: SimilarMovie[] = [];

  /* ui state ------------------------------------------------------------ */
  loading = true;
  error = '';
  primary = '#0f172a';   // fallback tailwind-slate‑900
  selectedScore?: number;
  inWatchlist = false;
  watchIds: number[] = [];

  /* helpers ------------------------------------------------------------- */
  img = (p: string, size = 500) => `https://image.tmdb.org/t/p/w${size}${p}`;
  yt = (k: string) => `https://www.youtube.com/embed/${k}`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movies: MovieService
  ) { }

  /* ───────────────────────────────────────────────────────────────────── */
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.fetch(id);
  }

  private fetch(id: number) {
    this.loading = true;
    this.movies.getMovieById(id).subscribe({
      next: d => {
        this.movie = d;
        this.selectedScore = d.userRating;
        this.extractColor(d.posterUrl);
        this.loading = false;

        this.movies.getTrailers(id).subscribe(t => this.trailers = t);
        this.movies.getSimilar(id).subscribe(s => this.similar = s);

        this.movies.getWatchlist().subscribe(w =>
          this.watchIds = w.map(x => x.movie.movieId));
        this.inWatchlist = this.watchIds.includes(id);
      },
      error: () => { this.error = 'Movie not found'; this.loading = false; }
    });
  }

  /* dominant color via Vibrant – guarded */
  private async extractColor(path: string) {
    if (!path) return;
    try {
      const mod: any = await import('node-vibrant');
      const Vibrant = mod.default ?? mod;
      const sw = (await Vibrant.from(this.img(path)).getPalette()).Vibrant;
      if (sw) this.primary = sw.getHex();
    } catch { }
  }

  /* keyboard shortcuts -------------------------------------------------- */
  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') this.router.navigate(['/movies']);
  }

  /* actions ------------------------------------------------------------- */
  toggleWatch() {
    if (!this.movie) return;
    const op = this.inWatchlist
      ? this.movies.removeFromWatchlist(this.movie.movieId)
      : this.movies.addToWatchlist(this.movie.movieId);
    op.subscribe(() => this.inWatchlist = !this.inWatchlist);
  }

  submitRating() {
    if (!this.movie || this.selectedScore == null) return;
    this.movies.rateMovie(this.movie.movieId, this.selectedScore)
      .subscribe(() => this.movie!.userRating = this.selectedScore);
  }

  removeRating() {
    if (!this.movie) return;
    this.movies.removeRating(this.movie.movieId).subscribe(() => {
      this.movie!.userRating = undefined;
      this.selectedScore = undefined;
    });
  }
}
