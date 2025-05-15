import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { WatchlistComponent } from './movies/watchlist/watchlist.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { AdminRatingsComponent } from './admin/admin-ratings/admin-ratings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MovieListComponent, canActivate: [AuthGuard] },
  { path: 'movies/:id', component: MovieDetailComponent, canActivate: [AuthGuard] },
  { path: 'my-watchlist', component: WatchlistComponent, canActivate: [AuthGuard] },
  { path: 'recommendations', component: RecommendationsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin/ratings', component: AdminRatingsComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
