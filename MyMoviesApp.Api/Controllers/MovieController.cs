using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MyMoviesApp.Core.Interfaces;
using MyMoviesApp.Infrastructure.Data;

namespace MyMoviesApp.Api.Controllers
{
    // DTOs used by MovieController
    public record SearchMovieDto(
        int MovieId,
        string TmdbId,
        string Title,
        string PosterUrl,
        double AverageRating,
        int RatingCount
    );

    public record CastMemberDto(string Name, string Character);

    public record MovieDetailDto(
        int MovieId,
        string TmdbId,
        string Title,
        string PosterUrl,
        string Overview,
        List<CastMemberDto> Cast,
        int? UserRating,
        int? MasterRating
    );

    // Represents one of Glarky’s Top Picks
    public record AdminRatingDto(
        int MovieId,
        string TmdbId,
        string Title,
        string PosterUrl,
        int Score
    );

    // Represents one Trending movie (from TMDb)
    public record TrendingDto(
        int MovieId,
        string TmdbId,
        string Title,
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
    [Route("api/movies")]
    public class MovieController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly ITmdbService _tmdb;
        private readonly IConfiguration _config;

        public MovieController(
            ApplicationDbContext db,
            ITmdbService tmdb,
            IConfiguration config)
        {
            _db = db;
            _tmdb = tmdb;
            _config = config;
        }

        // 1) GET /api/movies?page=&pageSize=&minRating=&maxRating=
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 25,
            [FromQuery] int? minRating = null,
            [FromQuery] int? maxRating = null
        )
        {
            var query = _db.Movies.AsQueryable();

            if (minRating.HasValue || maxRating.HasValue)
            {
                var avgQuery = _db.Ratings
                    .GroupBy(r => r.MovieId)
                    .Select(g => new
                    {
                        MovieId = g.Key,
                        Avg = g.Average(r => r.Score)
                    });

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
                    m.PosterUrl,
                    m.AverageRating,
                    m.RatingCount
                ))
                .ToListAsync();

            return Ok(new PagedResultDto<SearchMovieDto>(
                items,
                total,
                page,
                pageSize
            ));
        }

        // 2) GET /api/movies/search?query=…
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Query cannot be empty.");

            // Local DB search
            var local = await _db.Movies
                .Where(m => EF.Functions.ILike(m.Title, $"%{query}%"))
                .Select(m => new SearchMovieDto(
                    m.MovieId,
                    m.TmdbId,
                    m.Title,
                    m.PosterUrl,
                    m.AverageRating,
                    m.RatingCount
                ))
                .ToListAsync();

            // TMDb fallback
            var tmdbResults = await _tmdb.SearchMoviesAsync(query);
            var tmdbMapped = tmdbResults.Select(r =>
                new SearchMovieDto(
                    0,
                    r.TmdbId,
                    r.Title,
                    r.PosterPath ?? string.Empty,
                    0.0,
                    0
                )
            );

            return Ok(local.Concat(tmdbMapped));
        }

        // 3) GET /api/movies/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            // First, attempt to find the movie in the local DB by MovieId
            var movie = await _db.Movies
                .Where(m => m.MovieId == id)
                .Select(m => new
                {
                    m.MovieId,
                    m.TmdbId,
                    m.Title,
                    m.PosterUrl,
                    m.Overview
                })
                .FirstOrDefaultAsync();

            if (movie != null)
            {
                // If found locally, fetch full TMDb details for cast + overview
                var details = await _tmdb.GetMovieDetailsAsync(movie.TmdbId);

                var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
                var userRating = await _db.Ratings
                    .Where(r => r.UserId == userId && r.MovieId == id)
                    .Select(r => (int?)r.Score)
                    .FirstOrDefaultAsync();

                // Fetch the “master” (Glarky) rating—still relevant on the details page
                if (!int.TryParse(_config["MasterUserId"], out var masterId))
                    masterId = 1;

                var masterRating = await _db.Ratings
                    .Where(r => r.UserId == masterId && r.MovieId == id)
                    .Select(r => (int?)r.Score)
                    .FirstOrDefaultAsync();

                var dto = new MovieDetailDto(
                    movie.MovieId,
                    movie.TmdbId,
                    movie.Title,
                    movie.PosterUrl,
                    details.Overview,
                    details.Cast.Select(c => new CastMemberDto(c.Name, c.Character)).ToList(),
                    userRating,
                    masterRating
                );

                return Ok(dto);
            }
            else
            {
                // If not in local DB, treat `id` as a TMDb integer ID.
                // Convert `id` back to string, and attempt to fetch from TMDb.
                try
                {
                    var tmdbDetails = await _tmdb.GetMovieDetailsAsync(id.ToString());
                    var fallbackDto = new MovieDetailDto(
                        0,
                        tmdbDetails.TmdbId,
                        tmdbDetails.Title,
                        string.Empty,
                        tmdbDetails.Overview,
                        tmdbDetails.Cast.Select(c => new CastMemberDto(c.Name, c.Character)).ToList(),
                        null,
                        null
                    );
                    return Ok(fallbackDto);
                }
                catch (InvalidOperationException)
                {
                    return NotFound(); // neither local nor TMDb found
                }
                catch
                {
                    return StatusCode(502, "Failed to fetch data from TMDb.");
                }
            }
        }

        // 4) GET /api/movies/admin-ratings
        //    Returns **all** ratings by MasterUserId (no .Take(10))
        [HttpGet("admin-ratings")]
        public async Task<IActionResult> GetAdminRatings()
        {
            if (!int.TryParse(_config["MasterUserId"], out var masterId))
                masterId = 1;

            try
            {
                var masterRatings = await _db.Ratings
                    .Where(r => r.UserId == masterId)
                    .Include(r => r.Movie)
                    .OrderByDescending(r => r.Score)
                    .Select(r => new AdminRatingDto(
                        r.MovieId,
                        r.Movie!.TmdbId,
                        r.Movie!.Title,
                        r.Movie!.PosterUrl,
                        r.Score
                    ))
                    // *** Removed .Take(10) so we return all Glarky’s ratings ***
                    .ToListAsync();

                return Ok(masterRatings);
            }
            catch
            {
                return Ok(Array.Empty<AdminRatingDto>());
            }
        }

        // 5) GET /api/movies/trending
        //    Returns TMDb’s daily trending movies. We assign MovieId = parsed TMDb ID.
        [HttpGet("trending")]
        public async Task<IActionResult> GetTrending()
        {
            try
            {
                var tmdbResults = await _tmdb.GetTrendingMoviesAsync();

                // For each trending result, parse the TmdbId string to an integer:
                var trending = tmdbResults
                    .Select(r =>
                    {
                        int parsedId = 0;
                        if (!int.TryParse(r.TmdbId, out parsedId))
                        {
                            parsedId = 0;
                        }

                        return new TrendingDto(
                            parsedId,         // Used as the route ID when clicking
                            r.TmdbId,
                            r.Title,
                            r.PosterPath,
                            0.0,
                            0
                        );
                    })
                    .ToList();

                return Ok(trending);
            }
            catch
            {
                return StatusCode(502, "Failed to fetch TMDb trending data.");
            }
        }
    }
}
