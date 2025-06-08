// File: MyMoviesApp.Api/Controllers/AdminRatingsController.cs
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MyMoviesApp.Api.Contracts.Admin;
using MyMoviesApp.Core.Services;
using MyMoviesApp.Infrastructure.Data;

namespace MyMoviesApp.Api.Controllers
{
    /// <summary>Admin‑only CRUD endpoints for master ratings.</summary>
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/admin/ratings")]
    public sealed class AdminRatingsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly int _masterUserId;

        public AdminRatingsController(ApplicationDbContext db, IConfiguration config)
        {
            _db = db;
            _masterUserId = config.GetValue<int>("MasterUserId");
        }

        // ──────────────────────────────────────────────────────────────────────────
        // GET /api/admin/ratings
        // Returns all master ratings with movie info.
        // ──────────────────────────────────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken ct)
        {
            var list = await _db.Ratings
                .Where(r => r.UserId == _masterUserId)
                .Include(r => r.Movie)
                .Select(r => new
                {
                    r.MovieId,
                    r.Movie.TmdbId,
                    MovieTitle = r.Movie.Title,
                    r.Score
                })
                .OrderByDescending(r => r.Score)          // send pre‑sorted
                .ToListAsync(ct);

            return Ok(list);
        }

        // ──────────────────────────────────────────────────────────────────────────
        // POST /api/admin/ratings          (body: { movieId, score })
        // Upsert by local MovieId – kept for backward compatibility.
        // ──────────────────────────────────────────────────────────────────────────
        public sealed record AdminUpsertDto(int MovieId, int Score);

        [HttpPost]
        public async Task<IActionResult> UpsertByMovieId([FromBody] AdminUpsertDto dto, CancellationToken ct)
        {
            var rating = await _db.Ratings.SingleOrDefaultAsync(
                r => r.UserId == _masterUserId && r.MovieId == dto.MovieId, ct);

            if (rating is null)
            {
                _db.Ratings.Add(new Core.Entities.Rating
                {
                    UserId = _masterUserId,
                    MovieId = dto.MovieId,
                    Score = dto.Score,
                    RatedAt = DateTime.UtcNow
                });
            }
            else
            {
                rating.Score = dto.Score;
                rating.RatedAt = DateTime.UtcNow;
            }

            await _db.SaveChangesAsync(ct);
            return Ok();
        }

        // ──────────────────────────────────────────────────────────────────────────
        // POST /api/admin/ratings/tmdb     (body: { tmdbId, score })
        // Preferred: add/update via TMDB ID (auto‑creates movie if missing).
        // ──────────────────────────────────────────────────────────────────────────
        [HttpPost("tmdb")]
        public async Task<IActionResult> UpsertByTmdbId(
            [FromBody] AddMasterRatingRequest dto,
            [FromServices] IMasterRatingService svc,
            CancellationToken ct)
        {
            if (dto.Score is < 1 or > 100)
                return BadRequest("Score must be 1–100.");

            var movieId = await svc.AddOrUpdateAsync(dto.TmdbId, dto.Score, _masterUserId, ct);
            return Ok(new { MovieId = movieId });
        }

        // ──────────────────────────────────────────────────────────────────────────
        // DELETE /api/admin/ratings/{movieId}
        // ──────────────────────────────────────────────────────────────────────────
        [HttpDelete("{movieId:int}")]
        public async Task<IActionResult> Delete(int movieId, CancellationToken ct)
        {
            var rating = await _db.Ratings.SingleOrDefaultAsync(
                r => r.UserId == _masterUserId && r.MovieId == movieId, ct);

            if (rating is null)
                return NotFound();

            _db.Ratings.Remove(rating);
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
    }
}
