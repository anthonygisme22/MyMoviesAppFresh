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
    // DTOs for movies
    public record SearchMovieDto(
        int? MovieId,
        string? TmdbId,
        string Title,
        int Year,
        string PosterUrl
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
    [Route("api/[controller]")]
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

        // 1) GET /api/movies with pagination & filters
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 25,
            [FromQuery] int? yearFrom = null,
            [FromQuery] int? yearTo = null,
            [FromQuery] int? minRating = null,
            [FromQuery] int? maxRating = null
        )
        {
            var query = _db.Movies.AsQueryable();

            if (yearFrom.HasValue)
                query = query.Where(m => m.Year >= yearFrom.Value);

            if (yearTo.HasValue)
                query = query.Where(m => m.Year <= yearTo.Value);

            if (minRating.HasValue || maxRating.HasValue)
            {
                // We'll calculate average score by MovieId
                var avgQuery = _db.Ratings
                    .GroupBy(r => r.MovieId)
                    .Select(g => new
                    {
                        MovieId = g.Key,
                        Avg = g.Average(r => r.Score)
                    });

                // Join the average query with movies
                query = from m in query
                        join a in avgQuery on m.MovieId equals a.MovieId
                        where (!minRating.HasValue || a.Avg >= minRating.Value)
                           && (!maxRating.HasValue || a.Avg <= maxRating.Value)
                        select m;
            }

            var total = await query.CountAsync();

            var items = await query
                .OrderBy(m => m.Title)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(m => new SearchMovieDto(
                    m.MovieId,
                    m.TmdbId,
                    m.Title,
                    m.Year,
                    m.PosterUrl
                ))
                .ToListAsync();

            return Ok(new PagedResultDto<SearchMovieDto>(
                items,
                total,
                page,
                pageSize
            ));
        }

        // 2) GET /api/movies/search?query=...
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest("Query cannot be empty.");
            }

            // First, search local DB
            var local = await _db.Movies
                .Where(m => EF.Functions.ILike(m.Title, $"%{query}%"))
                .Select(m => new SearchMovieDto(
                    m.MovieId,
                    m.TmdbId,
                    m.Title,
                    m.Year,
                    m.PosterUrl
                ))
                .ToListAsync();

            // Then, search TMDB
            var tmdbResults = await _tmdb.SearchMoviesAsync(query);
            var tmdbMapped = tmdbResults.Select(r =>
            {
                int year = 0;
                if (DateTime.TryParse(r.ReleaseDate, out var dt))
                {
                    year = dt.Year;
                }
                return new SearchMovieDto(
                    null,
                    r.TmdbId,
                    r.Title,
                    year,
                    r.PosterPath
                );
            });

            // Combine local + TMDB
            return Ok(local.Concat(tmdbMapped));
        }

        // 3) GET /api/movies/{id}
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
                    m.Year,
                    m.PosterUrl
                })
                .FirstOrDefaultAsync();

            if (movie == null)
            {
                return NotFound();
            }

            // Fetch detailed data from TMDB
            var details = await _tmdb.GetMovieDetailsAsync(movie.TmdbId);

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var userRating = await _db.Ratings
                .Where(r => r.UserId == userId && r.MovieId == id)
                .Select(r => (int?)r.Score)
                .FirstOrDefaultAsync();

            // Master rating (Tristan's rating)
            var masterId = _config.GetValue<int>("MasterUserId");
            var masterRating = await _db.Ratings
                .Where(r => r.UserId == masterId && r.MovieId == id)
                .Select(r => (int?)r.Score)
                .FirstOrDefaultAsync();

            var dto = new MovieDetailDto(
                movie.MovieId,
                movie.TmdbId!,
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

        // 4) GET /api/movies/admin-ratings
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
                    r.Movie.TmdbId!,
                    r.Movie.Title,
                    r.Movie.Year,
                    r.Movie.PosterUrl,
                    r.Score
                ))
                .Take(10)
                .ToListAsync();

            return Ok(list);
        }

        // 5) GET /api/movies/trending
        [HttpGet("trending")]
        public async Task<IActionResult> GetTrending()
        {
            // Group by MovieId instead of grouping by the entire Movie entity.
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

            // Now join to Movies to retrieve movie details
            var trending = from g in grouped
                           join m in _db.Movies on g.MovieId equals m.MovieId
                           select new TrendingDto(
                               m.MovieId,
                               m.TmdbId!,
                               m.Title,
                               m.Year,
                               m.PosterUrl,
                               Math.Round(g.Average, 1),
                               g.RatingCount
                           );

            return Ok(trending);
        }
    }
}
