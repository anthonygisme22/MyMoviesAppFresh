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
    [Authorize(Policy = "AdminUserOnly")]
    [ApiController]
    [Route("api/admin/ratings")]
    public sealed class AdminRatingsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly int _masterUserId;

        public AdminRatingsController(ApplicationDbContext db, IConfiguration cfg)
        {
            _db = db;
            _masterUserId = cfg.GetValue<int>("MasterUserId");
        }

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
                .OrderByDescending(r => r.Score)
                .ToListAsync(ct);

            return Ok(list);
        }

        public sealed record AdminUpsertDto(int MovieId, int Score);

        [HttpPost]
        public async Task<IActionResult> UpsertByMovieId(AdminUpsertDto dto, CancellationToken ct)
        {
            var rating = await _db.Ratings.SingleOrDefaultAsync(
                r => r.UserId == _masterUserId && r.MovieId == dto.MovieId, ct);

            if (rating is null)
                _db.Ratings.Add(new Core.Entities.Rating
                {
                    UserId = _masterUserId,
                    MovieId = dto.MovieId,
                    Score = dto.Score,
                    RatedAt = DateTime.UtcNow
                });
            else
            {
                rating.Score = dto.Score;
                rating.RatedAt = DateTime.UtcNow;
            }

            await _db.SaveChangesAsync(ct);
            return Ok();
        }

        [HttpPost("tmdb")]
        public async Task<IActionResult> UpsertByTmdbId(
            AddMasterRatingRequest dto,
            [FromServices] IMasterRatingService svc,
            CancellationToken ct)
        {
            if (dto.Score is < 1 or > 100) return BadRequest("Score must be 1‑100.");

            var id = await svc.AddOrUpdateAsync(dto.TmdbId, dto.Score, _masterUserId, ct);
            return Ok(new { MovieId = id });
        }

        [HttpDelete("{movieId:int}")]
        public async Task<IActionResult> Delete(int movieId, CancellationToken ct)
        {
            var rating = await _db.Ratings.SingleOrDefaultAsync(
                r => r.UserId == _masterUserId && r.MovieId == movieId, ct);

            if (rating is null) return NotFound();

            _db.Ratings.Remove(rating);
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
    }
}
