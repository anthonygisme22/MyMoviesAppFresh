// src/app/app.routes.ts

import { Routes } from '@angular/router';
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
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movies', component: MovieListComponent, canActivate: [AuthGuard] },
  { path: 'movies/:id', component: MovieDetailComponent, canActivate: [AuthGuard] },
  { path: 'watchlist', component: WatchlistComponent, canActivate: [AuthGuard] }, // ← added
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'recommendations', component: RecommendationsComponent, canActivate: [AuthGuard] },
  { path: 'admin/flags', component: FlagsComponent, canActivate: [AuthGuard] },
  { path: 'admin/movies', component: AdminMoviesComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
