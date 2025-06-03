// File: MyMoviesApp.Api/Controllers/MoviesController.cs

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MyMoviesApp.Infrastructure.Data;
using MyMoviesApp.Core.Services;

namespace MyMoviesApp.Api.Controllers
{
    // DTO for the movie list, including Glarky’s (master) rating
    public record SearchMovieDto(
        int MovieId,
        string TmdbId,
        string Title,
        int Year,
        string PosterUrl,
        int? MasterRating
    );

    public record CastMemberDto(string Name, string Character);

    public record MovieDetailDto(
        int MovieId,
        string TmdbId,
        string Title,
        int Year,
        string PosterUrl,
        string Overview,
        List<CastMemberDto> Cast,
        int? UserRating,
        int? MasterRating
    );

    public record AdminRatingDto(
        int MovieId,
        string TmdbId,
        string Title,
        int Year,
        string PosterUrl,
        int Score
    );

    public record TrendingDto(
        int MovieId,
        string TmdbId,
        string Title,
        int Year,
        string PosterUrl,
        double AverageRating,
        int RatingCount
    );

    public record PagedResultDto<T>(
        List<T> Items,
        int Total,
        int Page,
        int PageSize
    );

    [Authorize]
    [ApiController]
    [Route("[controller]")]   // ←BACK TO “/movies” instead of “/api/movies”
    public class MoviesController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly ITmdbService _tmdb;
        private readonly IConfiguration _config;

        public MoviesController(ApplicationDbContext db, ITmdbService tmdb, IConfiguration config)
        {
            _db = db;
            _tmdb = tmdb;
            _config = config;
        }

        // 1) GET /movies?page=1&pageSize=25
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 25,
            [FromQuery] int? yearFrom = null,
            [FromQuery] int? yearTo = null
        )
        {
            var query = _db.Movies.AsQueryable();

            if (yearFrom.HasValue)
            {
                query = query.Where(m =>
                    m.ReleaseDate != null &&
                    m.ReleaseDate.Length >= 4 &&
                    int.Parse(m.ReleaseDate.Substring(0, 4)) >= yearFrom.Value
                );
            }

            if (yearTo.HasValue)
            {
                query = query.Where(m =>
                    m.ReleaseDate != null &&
                    m.ReleaseDate.Length >= 4 &&
                    int.Parse(m.ReleaseDate.Substring(0, 4)) <= yearTo.Value
                );
            }

            var total = await query.CountAsync();
            var masterId = _config.GetValue<int>("MasterUserId");

            var items = await query
                .OrderBy(m => m.Title)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(m => new SearchMovieDto(
                    m.MovieId,
                    m.TmdbId,
                    m.Title,
                    m.ReleaseDate != null && m.ReleaseDate.Length >= 4
                        ? int.Parse(m.ReleaseDate.Substring(0, 4))
                        : 0,
                    m.PosterUrl,
                    _db.Ratings
                        .Where(r => r.MovieId == m.MovieId && r.UserId == masterId)
                        .Select(r => (int?)r.Score)
                        .FirstOrDefault()
                ))
                .ToListAsync();

            return Ok(new PagedResultDto<SearchMovieDto>(
                items,
                total,
                page,
                pageSize
            ));
        }

        // 2) GET /movies/search?query=...
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Query cannot be empty.");

            var local = await _db.Movies
                .Where(m => EF.Functions.ILike(m.Title, $"%{query}%"))
                .Select(m => new SearchMovieDto(
                    m.MovieId,
                    m.TmdbId,
                    m.Title,
                    m.ReleaseDate != null && m.ReleaseDate.Length >= 4
                        ? int.Parse(m.ReleaseDate.Substring(0, 4))
                        : 0,
                    m.PosterUrl,
                    null
                ))
                .ToListAsync();

            var tmdbResults = await _tmdb.SearchMoviesAsync(query);
            var tmdbMapped = tmdbResults.Select(r =>
            {
                int year = 0;
                if (DateTime.TryParse(r.ReleaseDate, out var dt))
                    year = dt.Year;
                return new SearchMovieDto(
                    0,
                    r.TmdbId,
                    r.Title,
                    year,
                    r.PosterPath,
                    null
                );
            });

            return Ok(local.Concat(tmdbMapped));
        }

        // 3) GET /movies/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var movie = await _db.Movies
                .Where(m => m.MovieId == id)
                .Select(m => new
                {
                    m.MovieId,
                    m.TmdbId,
                    m.Title,
                    Year = m.ReleaseDate != null && m.ReleaseDate.Length >= 4
                        ? int.Parse(m.ReleaseDate.Substring(0, 4))
                        : 0,
                    m.PosterUrl
                })
                .FirstOrDefaultAsync();

            if (movie == null)
                return NotFound();

            var details = await _tmdb.GetMovieDetailsAsync(movie.TmdbId);

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var userRating = await _db.Ratings
                .Where(r => r.UserId == userId && r.MovieId == id)
                .Select(r => (int?)r.Score)
                .FirstOrDefaultAsync();

            var masterId = _config.GetValue<int>("MasterUserId");
            var masterRating = await _db.Ratings
                .Where(r => r.UserId == masterId && r.MovieId == id)
                .Select(r => (int?)r.Score)
                .FirstOrDefaultAsync();

            var dto = new MovieDetailDto(
                movie.MovieId,
                movie.TmdbId,
                movie.Title,
                movie.Year,
                movie.PosterUrl,
                details.Overview,
                details.Cast.Select(c => new CastMemberDto(c.Name, c.Character)).ToList(),
                userRating,
                masterRating
            );

            return Ok(dto);
        }

        // 4) GET /movies/admin-ratings
        [HttpGet("admin-ratings")]
        public async Task<IActionResult> GetAdminRatings()
        {
            var masterId = _config.GetValue<int>("MasterUserId");
            var list = await _db.Ratings
                .Where(r => r.UserId == masterId)
                .Include(r => r.Movie)
                .OrderByDescending(r => r.Score)
                .Select(r => new AdminRatingDto(
                    r.MovieId,
                    r.Movie.TmdbId,
                    r.Movie.Title,
                    r.Movie.ReleaseDate != null && r.Movie.ReleaseDate.Length >= 4
                        ? int.Parse(r.Movie.ReleaseDate.Substring(0, 4))
                        : 0,
                    r.Movie.PosterUrl,
                    r.Score
                ))
                .Take(10)
                .ToListAsync();

            return Ok(list);
        }

        // 5) GET /movies/trending
        [HttpGet("trending")]
        public async Task<IActionResult> GetTrending()
        {
            var grouped = await _db.Ratings
                .GroupBy(r => r.MovieId)
                .Select(g => new
                {
                    MovieId = g.Key,
                    Average = g.Average(r => r.Score),
                    RatingCount = g.Count()
                })
                .OrderByDescending(x => x.Average)
                .ThenByDescending(x => x.RatingCount)
                .Take(10)
                .ToListAsync();

            var trending = from g in grouped
                           join m in _db.Movies on g.MovieId equals m.MovieId
                           select new TrendingDto(
                               m.MovieId,
                               m.TmdbId,
                               m.Title,
                               m.ReleaseDate != null && m.ReleaseDate.Length >= 4
                                   ? int.Parse(m.ReleaseDate.Substring(0, 4))
                                   : 0,
                               m.PosterUrl,
                               Math.Round(g.Average, 1),
                               g.RatingCount
                           );

            return Ok(trending);
        }
    }
}
