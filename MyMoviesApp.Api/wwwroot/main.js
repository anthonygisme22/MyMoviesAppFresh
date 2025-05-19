"use strict";
(self["webpackChunkmy_app"] = self["webpackChunkmy_app"] || []).push([["main"],{

/***/ 52:
/*!*********************************************************!*\
  !*** ./src/app/movies/watchlist/watchlist.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WatchlistComponent: () => (/* binding */ WatchlistComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 9565);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _movie_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../movie.service */ 6595);





function WatchlistComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Loading watchlist\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function WatchlistComponent_div_4_li_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 11)(3, "h2", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function WatchlistComponent_div_4_li_2_Template_button_click_7_listener() {
      const item_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.remove(item_r2.movie.movieId));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, " Remove ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("alt", item_r2.movie.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx_r2.imageBaseUrl + item_r2.movie.posterUrl, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r2.movie.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r2.movie.year);
  }
}
function WatchlistComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "ul", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, WatchlistComponent_div_4_li_2_Template, 9, 4, "li", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.watchlist);
  }
}
function WatchlistComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Your watchlist is empty.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function WatchlistComponent_p_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.error);
  }
}
class WatchlistComponent {
  movieService;
  watchlist = [];
  loading = true;
  error = '';
  imageBaseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.tmdbImageBaseUrl;
  constructor(movieService) {
    this.movieService = movieService;
  }
  ngOnInit() {
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
  remove(id) {
    this.movieService.removeFromWatchlist(id).subscribe({
      next: () => {
        this.watchlist = this.watchlist.filter(w => w.movie.movieId !== id);
      },
      error: () => console.error('Failed to remove from watchlist')
    });
  }
  static ɵfac = function WatchlistComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || WatchlistComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_movie_service__WEBPACK_IMPORTED_MODULE_1__.MovieService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: WatchlistComponent,
    selectors: [["app-watchlist"]],
    decls: 8,
    vars: 4,
    consts: [["empty", ""], [1, "pt-20", "p-4"], [1, "text-2xl", "font-bold", "mb-4"], ["class", "text-gray-600", 4, "ngIf"], [4, "ngIf", "ngIfElse"], ["class", "text-red-600 mt-4", 4, "ngIf"], [1, "text-gray-600"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4", "gap-4"], ["class", "bg-white rounded shadow overflow-hidden", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded", "shadow", "overflow-hidden"], [1, "w-full", "h-48", "object-cover", 3, "src", "alt"], [1, "p-2"], [1, "font-bold"], [1, "mt-2", "text-red-600", 3, "click"], [1, "text-red-600", "mt-4"]],
    template: function WatchlistComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1)(1, "h1", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Your Watchlist");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, WatchlistComponent_div_3_Template, 2, 0, "div", 3)(4, WatchlistComponent_div_4_Template, 3, 1, "div", 4)(5, WatchlistComponent_ng_template_5_Template, 2, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"])(7, WatchlistComponent_p_7_Template, 2, 1, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const empty_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.watchlist.length)("ngIfElse", empty_r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.error);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf],
    styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ3YXRjaGxpc3QuY29tcG9uZW50LmNzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW92aWVzL3dhdGNobGlzdC93YXRjaGxpc3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esb0tBQW9LIiwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 92:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _shared_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/navbar/navbar.component */ 8290);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 9585);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 85);




class AppComponent {
  static ɵfac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AppComponent)();
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    decls: 2,
    vars: 0,
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-navbar")(1, "router-outlet");
      }
    },
    dependencies: [_shared_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_0__.NavbarComponent, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule // for <router-outlet>
    , _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterOutlet],
    encapsulation: 2
  });
}

/***/ }),

/***/ 300:
/*!**********************************************!*\
  !*** ./src/app/profile/profile.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfileComponent: () => (/* binding */ ProfileComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 9565);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth/auth.service */ 5498);



class ProfileComponent {
  auth;
  username = null;
  role = null;
  constructor(auth) {
    this.auth = auth;
  }
  ngOnInit() {
    this.username = this.auth.getUsername();
    this.role = this.auth.getRole();
  }
  static ɵfac = function ProfileComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || ProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: ProfileComponent,
    selectors: [["app-profile"]],
    decls: 12,
    vars: 2,
    consts: [[1, "pt-16", "p-4"], [1, "text-2xl", "font-bold"], [1, "mt-4", "space-y-2"]],
    template: function ProfileComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "My Profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2)(4, "p")(5, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Username:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "p")(9, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Role:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.username, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.role, "");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
    styles: ["img[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n\nselect[_ngcontent-%COMP%] {\n  width: 4rem;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2IiLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW1nIHtcclxuICBmbGV4LXNocmluazogMDtcclxufVxyXG5cclxuc2VsZWN0IHtcclxuICB3aWR0aDogNHJlbTtcclxufVxyXG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBLHdYQUF3WCIsInNvdXJjZXNDb250ZW50IjpbImltZyB7XHJcbiAgZmxleC1zaHJpbms6IDA7XHJcbn1cclxuXHJcbnNlbGVjdCB7XHJcbiAgd2lkdGg6IDRyZW07XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 860:
/*!***********************************************************!*\
  !*** ./src/app/movies/movie-list/movie-list.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MovieListComponent: () => (/* binding */ MovieListComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 9565);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 9585);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _movie_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../movie.service */ 6595);


 // ← Import RouterModule






const _c0 = a0 => ["/movies", a0];
function MovieListComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 9)(4, "h3", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "p", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const m_r1 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c0, m_r1.movieId));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("alt", m_r1.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx_r1.imageBaseUrl + m_r1.posterUrl, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](m_r1.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](m_r1.year);
  }
}
function MovieListComponent_p_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.error);
  }
}
class MovieListComponent {
  movieService;
  movies = [];
  error = '';
  imageBaseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.tmdbImageBaseUrl;
  page = 1;
  pageSize = 25;
  totalItems = 0;
  totalPages = 0;
  yearFrom;
  yearTo;
  minRating;
  maxRating;
  constructor(movieService) {
    this.movieService = movieService;
  }
  ngOnInit() {
    this.loadPage();
  }
  loadPage() {
    this.error = '';
    this.movieService.getMovies(this.page, this.pageSize, this.yearFrom, this.yearTo, this.minRating, this.maxRating).subscribe({
      next: data => {
        this.movies = data.items;
        this.totalItems = data.total;
        this.page = data.page;
        this.pageSize = data.pageSize;
        this.totalPages = Math.ceil(data.total / data.pageSize);
      },
      error: () => {
        this.error = 'Failed to load movies.';
      }
    });
  }
  applyFilters() {
    this.page = 1;
    this.loadPage();
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadPage();
    }
  }
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadPage();
    }
  }
  static ɵfac = function MovieListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || MovieListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_movie_service__WEBPACK_IMPORTED_MODULE_1__.MovieService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: MovieListComponent,
    selectors: [["app-movie-list"]],
    decls: 12,
    vars: 6,
    consts: [[1, "pt-20", "p-4", "space-y-4"], [1, "flex", "flex-wrap", "gap-2", "items-end", 3, "ngSubmit"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "lg:grid-cols-6", "gap-4"], [4, "ngFor", "ngForOf"], [1, "flex", "justify-center", "items-center", "space-x-4", "mt-4"], [1, "px-3", "py-1", "bg-gray-200", "rounded", "disabled:opacity-50", 3, "click", "disabled"], ["class", "text-red-600 text-center", 4, "ngIf"], [1, "block", "bg-white", "rounded", "shadow", "overflow-hidden", "hover:shadow-lg", "transition", 3, "routerLink"], [1, "w-full", "h-40", "object-cover", 3, "src", "alt"], [1, "p-2"], [1, "font-semibold"], [1, "text-gray-600"], [1, "text-red-600", "text-center"]],
    template: function MovieListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function MovieListComponent_Template_form_ngSubmit_1_listener() {
          return ctx.applyFilters();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, MovieListComponent_ng_container_3_Template, 8, 7, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 4)(5, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function MovieListComponent_Template_button_click_5_listener() {
          return ctx.prevPage();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, " Previous ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function MovieListComponent_Template_button_click_9_listener() {
          return ctx.nextPage();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, " Next ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, MovieListComponent_p_11_Template, 2, 1, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.movies);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.page <= 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("Page ", ctx.page, " of ", ctx.totalPages, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.page >= ctx.totalPages);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.error);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgForm, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink],
    styles: ["\n\n\n\n\na[_ngcontent-%COMP%] {\n  display: block;\n  text-decoration: none;\n  color: inherit;\n}\n\n  \n\n  a[_ngcontent-%COMP%]:hover {\n    opacity: 0.95;\n  }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vdmllLWxpc3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzRUFBc0U7O0FBRXRFLDBDQUEwQztBQUMxQztFQUNFLGNBQWM7RUFDZCxxQkFBcUI7RUFDckIsY0FBYztBQUNoQjs7RUFFRSwwQkFBMEI7RUFDMUI7SUFDRSxhQUFhO0VBQ2YiLCJmaWxlIjoibW92aWUtbGlzdC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogRmlsZTogZnJvbnRlbmQvc3JjL2FwcC9tb3ZpZXMvbW92aWUtbGlzdC9tb3ZpZS1saXN0LmNvbXBvbmVudC5jc3MgKi9cclxuXHJcbi8qIE1ha2Ugc3VyZSB0aGUgPGE+IGZpbGxzIGl0cyBjb250YWluZXIgKi9cclxuYSB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIGNvbG9yOiBpbmhlcml0O1xyXG59XHJcblxyXG4gIC8qIE9wdGlvbmFsIGhvdmVyIGVmZmVjdCAqL1xyXG4gIGE6aG92ZXIge1xyXG4gICAgb3BhY2l0eTogMC45NTtcclxuICB9XHJcbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW92aWVzL21vdmllLWxpc3QvbW92aWUtbGlzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNFQUFzRTs7QUFFdEUsMENBQTBDO0FBQzFDO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtFQUNyQixjQUFjO0FBQ2hCOztFQUVFLDBCQUEwQjtFQUMxQjtJQUNFLGFBQWE7RUFDZjs7QUFFRixvdkJBQW92QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIEZpbGU6IGZyb250ZW5kL3NyYy9hcHAvbW92aWVzL21vdmllLWxpc3QvbW92aWUtbGlzdC5jb21wb25lbnQuY3NzICovXHJcblxyXG4vKiBNYWtlIHN1cmUgdGhlIDxhPiBmaWxscyBpdHMgY29udGFpbmVyICovXHJcbmEge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBjb2xvcjogaW5oZXJpdDtcclxufVxyXG5cclxuICAvKiBPcHRpb25hbCBob3ZlciBlZmZlY3QgKi9cclxuICBhOmhvdmVyIHtcclxuICAgIG9wYWNpdHk6IDAuOTU7XHJcbiAgfVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 1050:
/*!******************************************!*\
  !*** ./src/app/auth/auth.interceptor.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthInterceptor: () => (/* binding */ AuthInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ 5498);


class AuthInterceptor {
  auth;
  constructor(auth) {
    this.auth = auth;
  }
  intercept(req, next) {
    const token = this.auth.getToken();
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
  static ɵfac = function AuthInterceptor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AuthInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AuthInterceptor,
    factory: AuthInterceptor.ɵfac
  });
}

/***/ }),

/***/ 1424:
/*!**************************************************************!*\
  !*** ./src/app/recommendations/recommendations.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RecommendationsComponent: () => (/* binding */ RecommendationsComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 9565);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 7878);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);








function RecommendationsComponent_p_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.error);
  }
}
function RecommendationsComponent_div_10_li_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li", 13)(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", r_r2.title, ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", r_r2.reason, " ");
  }
}
function RecommendationsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 9)(1, "h2", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Recommended Movies");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ul", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, RecommendationsComponent_div_10_li_4_Template, 4, 2, "li", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.recommendations);
  }
}
function RecommendationsComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 9)(1, "h2", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Raw AI Response");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "pre", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.rawResponse);
  }
}
class RecommendationsComponent {
  http;
  prompt = '';
  recommendations = [];
  rawResponse = '';
  error = '';
  constructor(http) {
    this.http = http;
  }
  getRecommendations() {
    this.error = '';
    this.recommendations = [];
    this.rawResponse = '';
    this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/recommendations`, {
      prompt: this.prompt
    }).subscribe({
      next: data => {
        if ('error' in data) {
          this.error = data.error;
        } else if (Array.isArray(data)) {
          this.recommendations = data;
        } else if ('rawResponse' in data) {
          this.rawResponse = data.rawResponse;
        }
      },
      error: err => {
        this.error = err.error?.error || 'Failed to get recommendations.';
      }
    });
  }
  static ɵfac = function RecommendationsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || RecommendationsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: RecommendationsComponent,
    selectors: [["app-recommendations"]],
    decls: 12,
    vars: 4,
    consts: [[1, "pt-20", "p-4"], [1, "text-2xl", "font-bold", "mb-4"], [1, "mb-4"], [1, "block", "font-semibold"], ["rows", "3", "placeholder", "Describe what kind of movies you like...", 1, "w-full", "border", "p-2", 3, "ngModelChange", "ngModel"], [1, "bg-bb-blue", "text-white", "px-4", "py-2", "rounded", 3, "click"], ["class", "text-red-600 mt-2", 4, "ngIf"], ["class", "mt-4", 4, "ngIf"], [1, "text-red-600", "mt-2"], [1, "mt-4"], [1, "text-xl", "font-semibold"], [1, "list-disc", "ml-6"], ["class", "mt-2", 4, "ngFor", "ngForOf"], [1, "mt-2"], [1, "bg-gray-100", "p-2", "rounded"]],
    template: function RecommendationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "AI Recommendations");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2)(4, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Enter your prompt:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "textarea", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function RecommendationsComponent_Template_textarea_ngModelChange_6_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.prompt, $event) || (ctx.prompt = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RecommendationsComponent_Template_button_click_7_listener() {
          return ctx.getRecommendations();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " Get Recommendations ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, RecommendationsComponent_p_9_Template, 2, 1, "p", 6)(10, RecommendationsComponent_div_10_Template, 5, 1, "div", 7)(11, RecommendationsComponent_div_11_Template, 5, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.prompt);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.recommendations.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.rawResponse);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClientModule],
    styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWNvbW1lbmRhdGlvbnMuY29tcG9uZW50LmNzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcmVjb21tZW5kYXRpb25zL3JlY29tbWVuZGF0aW9ucy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSw0S0FBNEsiLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 2181:
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appRoutes: () => (/* binding */ appRoutes)
/* harmony export */ });
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home/home.component */ 7824);
/* harmony import */ var _auth_login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth/login/login.component */ 6539);
/* harmony import */ var _auth_register_register_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/register/register.component */ 9619);
/* harmony import */ var _movies_movie_list_movie_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./movies/movie-list/movie-list.component */ 860);
/* harmony import */ var _movies_movie_detail_movie_detail_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./movies/movie-detail/movie-detail.component */ 2662);
/* harmony import */ var _movies_watchlist_watchlist_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./movies/watchlist/watchlist.component */ 52);
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile/profile.component */ 300);
/* harmony import */ var _recommendations_recommendations_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./recommendations/recommendations.component */ 1424);
/* harmony import */ var _admin_flags_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./admin/flags.component */ 8584);
/* harmony import */ var _admin_admin_movies_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./admin/admin-movies.component */ 9450);
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./auth/auth.guard */ 8444);
// src/app/app.routes.ts











const appRoutes = [{
  path: '',
  component: _home_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent
}, {
  path: 'login',
  component: _auth_login_login_component__WEBPACK_IMPORTED_MODULE_1__.LoginComponent
}, {
  path: 'register',
  component: _auth_register_register_component__WEBPACK_IMPORTED_MODULE_2__.RegisterComponent
}, {
  path: 'movies',
  component: _movies_movie_list_movie_list_component__WEBPACK_IMPORTED_MODULE_3__.MovieListComponent,
  canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_10__.AuthGuard]
}, {
  path: 'movies/:id',
  component: _movies_movie_detail_movie_detail_component__WEBPACK_IMPORTED_MODULE_4__.MovieDetailComponent,
  canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_10__.AuthGuard]
}, {
  path: 'watchlist',
  component: _movies_watchlist_watchlist_component__WEBPACK_IMPORTED_MODULE_5__.WatchlistComponent,
  canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_10__.AuthGuard]
},
// ← added
{
  path: 'profile',
  component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_6__.ProfileComponent,
  canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_10__.AuthGuard]
}, {
  path: 'recommendations',
  component: _recommendations_recommendations_component__WEBPACK_IMPORTED_MODULE_7__.RecommendationsComponent,
  canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_10__.AuthGuard]
}, {
  path: 'admin/flags',
  component: _admin_flags_component__WEBPACK_IMPORTED_MODULE_8__.FlagsComponent,
  canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_10__.AuthGuard]
}, {
  path: 'admin/movies',
  component: _admin_admin_movies_component__WEBPACK_IMPORTED_MODULE_9__.AdminMoviesComponent,
  canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_10__.AuthGuard]
}, {
  path: '**',
  redirectTo: ''
}];

/***/ }),

/***/ 2662:
/*!***************************************************************!*\
  !*** ./src/app/movies/movie-detail/movie-detail.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MovieDetailComponent: () => (/* binding */ MovieDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 9565);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 85);
/* harmony import */ var _movie_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../movie.service */ 6595);





function MovieDetailComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.error, " ");
  }
}
function MovieDetailComponent_div_2_li_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const c_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" ", c_r2.name, " as ", c_r2.character, " ");
  }
}
function MovieDetailComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "h1", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "img", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "h2", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Cast");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "ul", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, MovieDetailComponent_div_2_li_9_Template, 2, 2, "li", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", ctx_r0.movie.title, " (", ctx_r0.movie.year, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("alt", ctx_r0.movie.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", ctx_r0.movie.posterUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.movie.overview);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.movie.cast);
  }
}
class MovieDetailComponent {
  route;
  movieService;
  movie;
  error = '';
  constructor(route, movieService) {
    this.route = route;
    this.movieService = movieService;
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'No movie ID provided.';
      return;
    }
    const movieId = +id; // convert string to number
    this.movieService.getById(movieId).subscribe({
      next: m => this.movie = m,
      error: () => this.error = 'Failed to load movie details.'
    });
  }
  static ɵfac = function MovieDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || MovieDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_movie_service__WEBPACK_IMPORTED_MODULE_0__.MovieService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: MovieDetailComponent,
    selectors: [["app-movie-detail"]],
    decls: 3,
    vars: 2,
    consts: [[1, "pt-20", "p-4"], ["class", "text-red-500 mb-2", 4, "ngIf"], [4, "ngIf"], [1, "text-red-500", "mb-2"], [1, "text-2xl", "font-bold", "mb-4"], [1, "mb-4", 3, "src", "alt"], [1, "mb-4"], [1, "text-xl", "font-semibold"], [1, "list-disc", "ml-6"], [4, "ngFor", "ngForOf"]],
    template: function MovieDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, MovieDetailComponent_div_1_Template, 2, 1, "div", 1)(2, MovieDetailComponent_div_2_Template, 10, 6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.movie);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf],
    styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtb3ZpZS1kZXRhaWwuY29tcG9uZW50LmNzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW92aWVzL21vdmllLWRldGFpbC9tb3ZpZS1kZXRhaWwuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0tBQXdLIiwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 4429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 3563);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 7878);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 9585);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3835);
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.component */ 92);
/* harmony import */ var _app_app_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.routes */ 2181);
/* harmony import */ var _app_auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/auth/auth.interceptor */ 1050);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ 5312);









if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.enableProdMode)();
}
(0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, {
  providers: [
  // HTTP client + your interceptor
  (0,_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.provideHttpClient)((0,_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.withInterceptorsFromDi)()), {
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HTTP_INTERCEPTORS,
    useClass: _app_auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_2__.AuthInterceptor,
    multi: true
  },
  // Router
  (0,_angular_router__WEBPACK_IMPORTED_MODULE_7__.provideRouter)(_app_app_routes__WEBPACK_IMPORTED_MODULE_1__.appRoutes),
  // Animations
  (0,_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__.provideAnimations)()]
}).catch(err => console.error(err));

/***/ }),

/***/ 5312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
// File: MyMoviesApp.Client/src/environments/environment.ts
const environment = {
  production: false,
  // Directly point to the .NET API's local URL/port:
  apiUrl: 'http://localhost:5091',
  tmdbImageBaseUrl: 'https://image.tmdb.org/t/p/w500'
};

/***/ }),

/***/ 5498:
/*!**************************************!*\
  !*** ./src/app/auth/auth.service.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 8764);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 7878);




class AuthService {
  http;
  tokenKey = 'token';
  // We'll call /auth endpoints on the .NET server:
  baseUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/auth`;
  constructor(http) {
    this.http = http;
  }
  login(username, password) {
    return this.http.post(`${this.baseUrl}/login`, {
      username,
      password
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(res => {
      // Store token in Local Storage for later use
      localStorage.setItem(this.tokenKey, res.token);
    }));
  }
  register(username, password) {
    return this.http.post(`${this.baseUrl}/register`, {
      username,
      password
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(res => {
      localStorage.setItem(this.tokenKey, res.token);
    }));
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
  }
  isLoggedIn() {
    return !!this.getToken();
  }
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
  getPayload() {
    const token = this.getToken();
    if (!token) return null;
    try {
      // Decode the middle part of the JWT
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }
  getUsername() {
    const payload = this.getPayload();
    // ClaimTypes.Name often gets stored as "unique_name" or "name" depending on your server
    return payload?.unique_name ?? payload?.name ?? null;
  }
  getRole() {
    const payload = this.getPayload();
    return payload?.role ?? null;
  }
  static ɵfac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: AuthService,
    factory: AuthService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 5759:
/*!************************************************!*\
  !*** ./src/app/admin/feature-flags.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FeatureFlagsService: () => (/* binding */ FeatureFlagsService)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 7878);



class FeatureFlagsService {
  http;
  baseUrl = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/featureflags`;
  constructor(http) {
    this.http = http;
  }
  getAll() {
    return this.http.get(this.baseUrl);
  }
  update(id, isEnabled) {
    return this.http.put(`${this.baseUrl}/${id}`, {
      isEnabled
    });
  }
  static ɵfac = function FeatureFlagsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || FeatureFlagsService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: FeatureFlagsService,
    factory: FeatureFlagsService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 6539:
/*!***********************************************!*\
  !*** ./src/app/auth/login/login.component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginComponent: () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 9565);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 9585);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth.service */ 5498);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 85);








function LoginComponent_p_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.error);
  }
}
class LoginComponent {
  auth;
  router;
  username = '';
  password = '';
  error = '';
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }
  onSubmit() {
    this.error = '';
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.error = 'Login failed.'
    });
  }
  static ɵfac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: LoginComponent,
    selectors: [["app-login"]],
    decls: 16,
    vars: 4,
    consts: [["loginForm", "ngForm"], [1, "pt-20", "p-4", "max-w-sm", "mx-auto"], [1, "text-2xl", "font-bold", "mb-4"], [1, "space-y-4", 3, "ngSubmit"], [1, "block", "mb-1"], ["name", "username", "required", "", 1, "w-full", "border", "p-2", "rounded", 3, "ngModelChange", "ngModel"], ["name", "password", "type", "password", "required", "", 1, "w-full", "border", "p-2", "rounded", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "w-full", "bg-bb-blue", "text-white", "py-2", "rounded", "disabled:opacity-50", 3, "disabled"], ["class", "text-red-600 mt-2", 4, "ngIf"], [1, "text-red-600", "mt-2"]],
    template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 1)(1, "h2", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "form", 3, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_3_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.onSubmit());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div")(6, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Username");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_8_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.username, $event) || (ctx.username = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div")(10, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_12_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.password, $event) || (ctx.password = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, " Login ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, LoginComponent_p_15_Template, 2, 1, "p", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        const loginForm_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.username);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.password);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", loginForm_r3.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgForm, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxnS0FBZ0siLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 6595:
/*!*****************************************!*\
  !*** ./src/app/movies/movie.service.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MovieService: () => (/* binding */ MovieService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 7878);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);




class MovieService {
  http;
  baseUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/movies`;
  watchlistUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/watchlist`;
  ratingsUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/ratings`;
  constructor(http) {
    this.http = http;
  }
  getMovies(page, pageSize, yearFrom, yearTo, minRating, maxRating) {
    let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString());
    if (yearFrom != null) params = params.set('yearFrom', yearFrom.toString());
    if (yearTo != null) params = params.set('yearTo', yearTo.toString());
    if (minRating != null) params = params.set('minRating', minRating.toString());
    if (maxRating != null) params = params.set('maxRating', maxRating.toString());
    return this.http.get(this.baseUrl, {
      params
    });
  }
  search(query) {
    return this.http.get(`${this.baseUrl}/search?query=${encodeURIComponent(query)}`);
  }
  getById(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getWatchlist() {
    return this.http.get(this.watchlistUrl);
  }
  addToWatchlist(movieId) {
    return this.http.post(this.watchlistUrl, {
      MovieId: movieId
    });
  }
  removeFromWatchlist(movieId) {
    return this.http.delete(`${this.watchlistUrl}/${movieId}`);
  }
  rateMovie(movieId, score) {
    return this.http.post(this.ratingsUrl, {
      MovieId: movieId,
      Score: score
    });
  }
  removeRating(movieId) {
    return this.http.delete(`${this.ratingsUrl}/${movieId}`);
  }
  static ɵfac = function MovieService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || MovieService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: MovieService,
    factory: MovieService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 6888:
/*!**************************************!*\
  !*** ./src/app/home/home.service.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeService: () => (/* binding */ HomeService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 7878);



class HomeService {
  http;
  api = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/movies`;
  constructor(http) {
    this.http = http;
  }
  getAdminRatings() {
    return this.http.get(`${this.api}/admin-ratings`);
  }
  getTrending() {
    return this.http.get(`${this.api}/trending`);
  }
  static ɵfac = function HomeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || HomeService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: HomeService,
    factory: HomeService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 7824:
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeComponent: () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 9565);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 9585);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _home_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.service */ 6888);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 85);







function HomeComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Loading\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function HomeComponent_div_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HomeComponent_div_9_div_1_Template_div_click_0_listener() {
      const f_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.viewMovie(f_r2.movieId));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 17)(3, "h3", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const f_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("alt", f_r2.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx_r2.imageBaseUrl + f_r2.posterUrl, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](f_r2.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Score: ", f_r2.score, "/10");
  }
}
function HomeComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, HomeComponent_div_9_div_1_Template, 7, 4, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.featured);
  }
}
function HomeComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Loading\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function HomeComponent_div_14_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HomeComponent_div_14_div_1_Template_div_click_0_listener() {
      const t_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.viewMovie(t_r5.movieId));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 17)(3, "h3", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const t_r5 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("alt", t_r5.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx_r2.imageBaseUrl + t_r5.posterUrl, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](t_r5.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", t_r5.averageRating, "/10 (", t_r5.ratingCount, ")");
  }
}
function HomeComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, HomeComponent_div_14_div_1_Template, 7, 5, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.trending);
  }
}
class HomeComponent {
  homeSvc;
  router;
  featured = [];
  trending = [];
  loadingFeatured = true;
  loadingTrending = true;
  error = '';
  imageBaseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.tmdbImageBaseUrl;
  // <-- router made public
  constructor(homeSvc, router) {
    this.homeSvc = homeSvc;
    this.router = router;
  }
  ngOnInit() {
    this.homeSvc.getAdminRatings().subscribe({
      next: data => {
        this.featured = data;
        this.loadingFeatured = false;
      },
      error: () => {
        this.error = 'Failed to load featured picks.';
        this.loadingFeatured = false;
      }
    });
    this.homeSvc.getTrending().subscribe({
      next: data => {
        this.trending = data;
        this.loadingTrending = false;
      },
      error: () => {
        this.error = 'Failed to load trending movies.';
        this.loadingTrending = false;
      }
    });
  }
  viewMovie(id) {
    this.router.navigate(['/movies', id]);
  }
  static ɵfac = function HomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_home_service__WEBPACK_IMPORTED_MODULE_1__.HomeService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: HomeComponent,
    selectors: [["app-home"]],
    decls: 22,
    vars: 4,
    consts: [[1, "pt-16", "bg-gray-50", "min-h-screen", "p-4", "space-y-12"], [1, "relative", "h-56", "bg-cover", "bg-center", "rounded-lg", "overflow-hidden", 2, "background-image", "url('/assets/hero.jpg')"], [1, "absolute", "inset-0", "bg-black", "bg-opacity-50", "flex", "items-center", "justify-center"], [1, "text-4xl", "text-white", "font-bold"], [1, "text-2xl", "font-semibold", "mb-2"], ["class", "text-gray-500", 4, "ngIf"], ["class", "flex space-x-4 overflow-x-auto pb-2", 4, "ngIf"], ["class", "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4", 4, "ngIf"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-4"], [1, "bg-bb-blue", "text-white", "rounded", "py-4", "shadow", "hover:bg-opacity-90", 3, "click"], [1, "bg-bb-yellow", "text-black", "rounded", "py-4", "shadow", "hover:opacity-90", 3, "click"], [1, "bg-green-500", "text-white", "rounded", "py-4", "shadow", "hover:opacity-90", 3, "click"], [1, "text-gray-500"], [1, "flex", "space-x-4", "overflow-x-auto", "pb-2"], ["class", "min-w-[180px] bg-white rounded shadow cursor-pointer", 3, "click", 4, "ngFor", "ngForOf"], [1, "min-w-[180px]", "bg-white", "rounded", "shadow", "cursor-pointer", 3, "click"], [1, "w-full", "h-40", "object-cover", "rounded-t", 3, "src", "alt"], [1, "p-2"], [1, "font-medium"], [1, "text-sm", "text-gray-600"], [1, "grid", "grid-cols-2", "sm:grid-cols-4", "md:grid-cols-6", "gap-4"], ["class", "bg-white rounded shadow overflow-hidden cursor-pointer", 3, "click", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded", "shadow", "overflow-hidden", "cursor-pointer", 3, "click"], [1, "w-full", "h-32", "object-cover", 3, "src", "alt"], [1, "text-sm", "font-medium"], [1, "text-xs", "text-gray-500"]],
    template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Welcome to MyMoviesApp");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "section")(6, "h2", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Featured Picks");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, HomeComponent_div_8_Template, 2, 0, "div", 5)(9, HomeComponent_div_9_Template, 2, 1, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "section")(11, "h2", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Trending Now");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, HomeComponent_div_13_Template, 2, 0, "div", 5)(14, HomeComponent_div_14_Template, 2, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "section", 8)(16, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_16_listener() {
          return ctx.router.navigate(["/watchlist"]);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, " My Watchlist ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_18_listener() {
          return ctx.router.navigate(["/movies"]);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, " Browse Movies ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_20_listener() {
          return ctx.router.navigate(["/recommendations"]);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, " AI Recommendations ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.loadingFeatured);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.loadingFeatured);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.loadingTrending);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.loadingTrending);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    styles: ["\n\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 0.25rem;\n}\n\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(0,0,0,0.2);\n  border-radius: 0.125rem;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQ0FBb0M7QUFDcEM7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsaUNBQWlDO0VBQ2pDLHVCQUF1QjtBQUN6QiIsImZpbGUiOiJob21lLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBIaWRlIHNjcm9sbGJhciBidXQgYWxsb3cgc2Nyb2xsICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gIHdpZHRoOiAwLjI1cmVtO1xyXG59XHJcblxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLDAuMik7XHJcbiAgYm9yZGVyLXJhZGl1czogMC4xMjVyZW07XHJcbn1cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0NBQW9DO0FBQ3BDO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGlDQUFpQztFQUNqQyx1QkFBdUI7QUFDekI7O0FBRUEsZ2tCQUFna0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBIaWRlIHNjcm9sbGJhciBidXQgYWxsb3cgc2Nyb2xsICovXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gIHdpZHRoOiAwLjI1cmVtO1xyXG59XHJcblxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLDAuMik7XHJcbiAgYm9yZGVyLXJhZGl1czogMC4xMjVyZW07XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 8290:
/*!***************************************************!*\
  !*** ./src/app/shared/navbar/navbar.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavbarComponent: () => (/* binding */ NavbarComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 9565);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 9585);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/auth/auth.service */ 5498);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 85);








function NavbarComponent_a_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Movies");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function NavbarComponent_a_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Watchlist");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function NavbarComponent_a_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Recommendations");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function NavbarComponent_a_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function NavbarComponent_a_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function NavbarComponent_a_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Register");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function NavbarComponent_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.auth.getUsername(), " ");
  }
}
function NavbarComponent_button_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NavbarComponent_button_14_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.logout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Logout ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function NavbarComponent_span_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\uD83C\uDF19");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function NavbarComponent_span_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u2600\uFE0F");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
class NavbarComponent {
  auth;
  router;
  searchTerm = '';
  isDarkMode = false;
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }
  ngOnInit() {
    this.isDarkMode = document.documentElement.classList.contains('dark');
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
  onSearch() {
    const q = this.searchTerm.trim();
    if (q) {
      this.router.navigate(['/movies'], {
        queryParams: {
          q
        }
      });
    }
    this.searchTerm = '';
  }
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  static ɵfac = function NavbarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || NavbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: NavbarComponent,
    selectors: [["app-navbar"]],
    decls: 22,
    vars: 11,
    consts: [[1, "fixed", "top-0", "left-0", "right-0", "h-16", "bg-bb-blue", "text-white", "px-4", "flex", "items-center", "space-x-4", "z-50", "dark:bg-gray-900"], ["routerLink", "/", 1, "flex", "items-center", "space-x-2"], ["src", "assets/logo.png", "alt", "Logo", 1, "h-8", "w-8"], [1, "text-2xl", "font-bold"], ["routerLink", "/", "routerLinkActive", "underline"], ["routerLink", "/movies", "routerLinkActive", "underline", 4, "ngIf"], ["routerLink", "/watchlist", "routerLinkActive", "underline", 4, "ngIf"], ["routerLink", "/recommendations", "routerLinkActive", "underline", 4, "ngIf"], ["routerLink", "/profile", "routerLinkActive", "underline", 4, "ngIf"], ["routerLink", "/login", "routerLinkActive", "underline", 4, "ngIf"], ["routerLink", "/register", "routerLinkActive", "underline", 4, "ngIf"], ["class", "ml-auto text-bb-yellow", 4, "ngIf"], ["class", "bg-bb-yellow text-black px-3 py-1 rounded", 3, "click", 4, "ngIf"], [1, "flex", "ml-4", 3, "ngSubmit"], ["name", "search", "placeholder", "Search all movies\u2026", 1, "px-2", "py-1", "rounded-l", "border-2", "border-bb-yellow", "bg-white", "text-black", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "bg-bb-yellow", "text-black", "px-4", "rounded-r"], ["aria-label", "Toggle dark mode", 1, "ml-4", "p-1", "rounded", "bg-gray-200", "text-gray-800", "dark:bg-gray-800", "dark:text-gray-200", 3, "click"], [4, "ngIf"], ["routerLink", "/movies", "routerLinkActive", "underline"], ["routerLink", "/watchlist", "routerLinkActive", "underline"], ["routerLink", "/recommendations", "routerLinkActive", "underline"], ["routerLink", "/profile", "routerLinkActive", "underline"], ["routerLink", "/login", "routerLinkActive", "underline"], ["routerLink", "/register", "routerLinkActive", "underline"], [1, "ml-auto", "text-bb-yellow"], [1, "bg-bb-yellow", "text-black", "px-3", "py-1", "rounded", 3, "click"]],
    template: function NavbarComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nav", 0)(1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "MyMoviesApp");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, NavbarComponent_a_7_Template, 2, 0, "a", 5)(8, NavbarComponent_a_8_Template, 2, 0, "a", 6)(9, NavbarComponent_a_9_Template, 2, 0, "a", 7)(10, NavbarComponent_a_10_Template, 2, 0, "a", 8)(11, NavbarComponent_a_11_Template, 2, 0, "a", 9)(12, NavbarComponent_a_12_Template, 2, 0, "a", 10)(13, NavbarComponent_span_13_Template, 2, 1, "span", 11)(14, NavbarComponent_button_14_Template, 2, 0, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "form", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function NavbarComponent_Template_form_ngSubmit_15_listener() {
          return ctx.onSearch();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function NavbarComponent_Template_input_ngModelChange_16_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, " Go ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NavbarComponent_Template_button_click_19_listener() {
          return ctx.toggleDarkMode();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, NavbarComponent_span_20_Template, 2, 0, "span", 17)(21, NavbarComponent_span_21_Template, 2, 0, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.auth.isLoggedIn());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.auth.isLoggedIn());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.auth.isLoggedIn());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.auth.isLoggedIn());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.auth.isLoggedIn());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.auth.isLoggedIn());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.auth.isLoggedIn());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.auth.isLoggedIn());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.searchTerm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isDarkMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isDarkMode);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgForm, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLinkActive],
    styles: ["\n\nnav[_ngcontent-%COMP%] {\n  z-index: 1000;\n}\n\n@media (min-width: 640px) {\n  \n\n  .sm\\\\[_ngcontent-%COMP%]:hidden {\n    display: none !important;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmJhci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNFQUFzRTtBQUN0RTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGdDQUFnQztFQUNoQztJQUNFLHdCQUF3QjtFQUMxQjtBQUNGIiwiZmlsZSI6Im5hdmJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogTmF2YmFyIGlzIG1vYmlsZS1maXJzdCBzbyBldmVyeXRoaW5nIHVuZGVyIHNtOiBhcHBsaWVzIHRvIGRlc2t0b3AgKi9cclxubmF2IHtcclxuICB6LWluZGV4OiAxMDAwO1xyXG59XHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogNjQwcHgpIHtcclxuICAvKiBIaWRlIG1vYmlsZSBtZW51IG9uIGRlc2t0b3AgKi9cclxuICAuc21cXFxcOmhpZGRlbiB7XHJcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG59XHJcbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL25hdmJhci9uYXZiYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzRUFBc0U7QUFDdEU7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxnQ0FBZ0M7RUFDaEM7SUFDRSx3QkFBd0I7RUFDMUI7QUFDRjs7QUFFQSxvcEJBQW9wQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIE5hdmJhciBpcyBtb2JpbGUtZmlyc3Qgc28gZXZlcnl0aGluZyB1bmRlciBzbTogYXBwbGllcyB0byBkZXNrdG9wICovXHJcbm5hdiB7XHJcbiAgei1pbmRleDogMTAwMDtcclxufVxyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDY0MHB4KSB7XHJcbiAgLyogSGlkZSBtb2JpbGUgbWVudSBvbiBkZXNrdG9wICovXHJcbiAgLnNtXFxcXDpoaWRkZW4ge1xyXG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 8444:
/*!************************************!*\
  !*** ./src/app/auth/auth.guard.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthGuard: () => (/* binding */ AuthGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ 5498);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 85);



class AuthGuard {
  auth;
  router;
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }
  canActivate() {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  static ɵfac = function AuthGuard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AuthGuard,
    factory: AuthGuard.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 8584:
/*!******************************************!*\
  !*** ./src/app/admin/flags.component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlagsComponent: () => (/* binding */ FlagsComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 9565);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 9585);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _feature_flags_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature-flags.service */ 5759);
/* harmony import */ var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth/auth.service */ 5498);






function FlagsComponent_p_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.error);
  }
}
function FlagsComponent_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "td", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "td", 9)(6, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function FlagsComponent_tr_13_Template_button_click_6_listener() {
      const f_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r0.toggle(f_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const f_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](f_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](f_r3.isEnabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", f_r3.isEnabled ? "Disable" : "Enable", " ");
  }
}
class FlagsComponent {
  flagsService;
  auth;
  flags = [];
  error = '';
  constructor(flagsService, auth) {
    this.flagsService = flagsService;
    this.auth = auth;
  }
  ngOnInit() {
    // Only Admins
    if (this.auth.getRole() !== 'Admin') {
      this.error = 'Access denied';
      return;
    }
    this.loadFlags();
  }
  loadFlags() {
    this.flagsService.getAll().subscribe({
      next: data => {
        this.flags = data;
      },
      error: () => {
        this.error = 'Failed to load feature flags.';
      }
    });
  }
  toggle(f) {
    this.flagsService.update(f.featureFlagId, !f.isEnabled).subscribe({
      next: () => this.loadFlags(),
      error: () => this.error = 'Failed to update flag.'
    });
  }
  static ɵfac = function FlagsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || FlagsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_feature_flags_service__WEBPACK_IMPORTED_MODULE_0__.FeatureFlagsService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: FlagsComponent,
    selectors: [["app-flags"]],
    decls: 14,
    vars: 2,
    consts: [[1, "p-4"], [1, "text-2xl", "font-bold", "mb-4"], ["class", "text-red-600 mb-4", 4, "ngIf"], [1, "min-w-full", "table-auto", "bg-white", "shadow", "rounded"], [1, "bg-gray-200"], [1, "px-4", "py-2", "text-left"], [1, "px-4", "py-2"], [4, "ngFor", "ngForOf"], [1, "text-red-600", "mb-4"], [1, "border", "px-4", "py-2"], [1, "bg-blue-600", "text-white", "px-3", "py-1", "rounded", 3, "click"]],
    template: function FlagsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Feature Flags Admin");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, FlagsComponent_p_3_Template, 2, 1, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "table", 3)(5, "thead")(6, "tr", 4)(7, "th", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "th", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Enabled");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "th", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, FlagsComponent_tr_13_Template, 8, 3, "tr", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.error);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.flags);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    styles: ["\n\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n  text-align: left;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZsYWdzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0NBQXNDO0FBQ3RDO0VBQ0UsV0FBVztFQUNYLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJmbGFncy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQWRkIGN1c3RvbSBzdHlsZXMgaGVyZSBpZiBkZXNpcmVkICovXHJcbnRhYmxlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG59XHJcblxyXG50aCwgdGQge1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbn1cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYWRtaW4vZmxhZ3MuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzQ0FBc0M7QUFDdEM7RUFDRSxXQUFXO0VBQ1gseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBLGdnQkFBZ2dCIiwic291cmNlc0NvbnRlbnQiOlsiLyogQWRkIGN1c3RvbSBzdHlsZXMgaGVyZSBpZiBkZXNpcmVkICovXHJcbnRhYmxlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG59XHJcblxyXG50aCwgdGQge1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 8622:
/*!***********************************************!*\
  !*** ./src/app/admin/admin-movies.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminMoviesService: () => (/* binding */ AdminMoviesService)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 7878);



class AdminMoviesService {
  http;
  url = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/movies/admin-create`;
  constructor(http) {
    this.http = http;
  }
  createAndRate(dto) {
    return this.http.post(this.url, dto);
  }
  static ɵfac = function AdminMoviesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AdminMoviesService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AdminMoviesService,
    factory: AdminMoviesService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 9450:
/*!*************************************************!*\
  !*** ./src/app/admin/admin-movies.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminMoviesComponent: () => (/* binding */ AdminMoviesComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 9565);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 9585);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _admin_movies_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin-movies.service */ 8622);







function AdminMoviesComponent_p_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.error);
  }
}
function AdminMoviesComponent_p_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.success);
  }
}
class AdminMoviesComponent {
  svc;
  error = '';
  success = '';
  constructor(svc) {
    this.svc = svc;
  }
  onSubmit(f) {
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
  static ɵfac = function AdminMoviesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AdminMoviesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_admin_movies_service__WEBPACK_IMPORTED_MODULE_0__.AdminMoviesService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AdminMoviesComponent,
    selectors: [["app-admin-movies"]],
    decls: 26,
    vars: 3,
    consts: [["f", "ngForm"], [1, "pt-20", "p-4", "max-w-lg", "mx-auto", "space-y-4"], [1, "text-2xl", "font-bold"], [1, "space-y-4", 3, "ngSubmit"], [1, "block"], ["name", "title", "ngModel", "", "required", "", 1, "w-full", "border", "p-2", "rounded"], ["name", "tmdbId", "ngModel", "", 1, "w-full", "border", "p-2", "rounded"], [1, "text-gray-500"], ["name", "year", "type", "number", "ngModel", "", "required", "", 1, "w-full", "border", "p-2", "rounded"], ["name", "posterUrl", "ngModel", "", "required", "", 1, "w-full", "border", "p-2", "rounded"], ["name", "score", "type", "number", "min", "1", "max", "10", "ngModel", "", "required", "", 1, "w-full", "border", "p-2", "rounded"], ["type", "submit", 1, "bg-bb-blue", "text-white", "px-4", "py-2", "rounded", 3, "disabled"], ["class", "text-red-600", 4, "ngIf"], ["class", "text-green-600", 4, "ngIf"], [1, "text-red-600"], [1, "text-green-600"]],
    template: function AdminMoviesComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 1)(1, "h2", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Admin: Add Movie & Rate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "form", 3, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function AdminMoviesComponent_Template_form_ngSubmit_3_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
          const f_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](4);
          return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.onSubmit(f_r2));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " Title ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, " TMDb ID (optional) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "small", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "If blank, manual entry.");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, " Year ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, " Poster URL ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, " Score (1\u201310) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](21, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, " Add & Rate ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, AdminMoviesComponent_p_24_Template, 2, 1, "p", 12)(25, AdminMoviesComponent_p_25_Template, 2, 1, "p", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        const f_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", f_r2.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.success);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.MaxValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgForm, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi1tb3ZpZXMuY29tcG9uZW50LmNzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYWRtaW4vYWRtaW4tbW92aWVzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHdLQUF3SyIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 9619:
/*!*****************************************************!*\
  !*** ./src/app/auth/register/register.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterComponent: () => (/* binding */ RegisterComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 9565);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 9585);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth.service */ 5498);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 85);








function RegisterComponent_p_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.success);
  }
}
function RegisterComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.error);
  }
}
class RegisterComponent {
  auth;
  router;
  username = '';
  password = '';
  error = '';
  success = '';
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }
  onSubmit() {
    this.error = '';
    this.success = '';
    this.auth.register(this.username, this.password).subscribe({
      next: () => {
        this.success = 'Registration successful! You can now log in.';
      },
      error: () => this.error = 'Registration failed.'
    });
  }
  static ɵfac = function RegisterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || RegisterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: RegisterComponent,
    selectors: [["app-register"]],
    decls: 17,
    vars: 5,
    consts: [["regForm", "ngForm"], [1, "pt-20", "p-4", "max-w-sm", "mx-auto"], [1, "text-2xl", "font-bold", "mb-4"], [1, "space-y-4", 3, "ngSubmit"], [1, "block", "mb-1"], ["name", "username", "required", "", 1, "w-full", "border", "p-2", "rounded", 3, "ngModelChange", "ngModel"], ["name", "password", "type", "password", "required", "", "minlength", "6", 1, "w-full", "border", "p-2", "rounded", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "w-full", "bg-bb-blue", "text-white", "py-2", "rounded", "disabled:opacity-50", 3, "disabled"], ["class", "text-green-600 mt-2", 4, "ngIf"], ["class", "text-red-600 mt-2", 4, "ngIf"], [1, "text-green-600", "mt-2"], [1, "text-red-600", "mt-2"]],
    template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 1)(1, "h2", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Register");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "form", 3, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function RegisterComponent_Template_form_ngSubmit_3_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.onSubmit());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div")(6, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Username");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function RegisterComponent_Template_input_ngModelChange_8_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.username, $event) || (ctx.username = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div")(10, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function RegisterComponent_Template_input_ngModelChange_12_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.password, $event) || (ctx.password = $event);
          return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, " Register ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, RegisterComponent_p_15_Template, 2, 1, "p", 8)(16, RegisterComponent_p_16_Template, 2, 1, "p", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        const regForm_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.username);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.password);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", regForm_r3.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.success);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.MinLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgForm, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWdpc3Rlci5jb21wb25lbnQuY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxvS0FBb0siLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map