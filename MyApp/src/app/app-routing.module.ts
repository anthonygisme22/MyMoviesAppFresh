// File: src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* ── Core/feature components ──────────────────────────────────────────────── */
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { WatchlistComponent } from './movies/watchlist/watchlist.component';
import { ProfileComponent } from './profile/profile.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { FlagsComponent } from './admin/flags.component';
import { AdminMoviesComponent } from './admin/admin-movies.component';

/* ── Guards ──────────────────────────────────────────────────────────────── */
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

/* ── Route definitions ───────────────────────────────────────────────────── */
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'movies', component: MovieListComponent, canActivate: [AuthGuard] },
  { path: 'movies/:id', component: MovieDetailComponent, canActivate: [AuthGuard] },

  { path: 'watchlist', component: WatchlistComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'recommendations', component: RecommendationsComponent, canActivate: [AuthGuard] },

  /* ── Admin‑only routes (lazy stand‑alone components) ───────────────────── */
  {
    path: 'admin/master-ratings',
    canActivate: [AdminGuard],
    loadComponent: () =>
      import('./admin/admin-master-ratings.component')
        .then(m => m.AdminMasterRatingsComponent)
  },
  {
    path: 'admin/add-rating',
    canActivate: [AdminGuard],
    loadComponent: () =>
      import('./admin/add-master-rating.component')
        .then(m => m.AddMasterRatingComponent)
  },
  { path: 'admin/flags', component: FlagsComponent, canActivate: [AdminGuard] },
  { path: 'admin/movies', component: AdminMoviesComponent, canActivate: [AdminGuard] },

  /* ── Fallback ──────────────────────────────────────────────────────────── */
  { path: '**', redirectTo: '' }
];

/* ── Angular module wrapper ──────────────────────────────────────────────── */
@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
