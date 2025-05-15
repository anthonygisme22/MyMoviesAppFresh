using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MyMoviesApp.Infrastructure.Data;

namespace MyMoviesApp.Api.Controllers
{
    // DTO for admin upsert requests
    public record AdminUpsertRatingDto(int MovieId, int Score);

    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/admin/ratings")]
    public class AdminRatingsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly int _masterUserId;

        public AdminRatingsController(ApplicationDbContext db, IConfiguration config)
        {
            _db = db;
            _masterUserId = config.GetValue<int>("MasterUserId");
        }

        // GET /api/admin/ratings
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _db.Ratings
                .Where(r => r.UserId == _masterUserId)
                .Include(r => r.Movie)
                .Select(r => new {
                    r.MovieId,
                    MovieTitle = r.Movie.Title,
                    r.Score
                })
                .ToListAsync();

            return Ok(list);
        }

        // POST /api/admin/ratings
        [HttpPost]
        public async Task<IActionResult> Upsert([FromBody] AdminUpsertRatingDto dto)
        {
            var existing = await _db.Ratings
                .SingleOrDefaultAsync(r => r.UserId == _masterUserId && r.MovieId == dto.MovieId);

            if (existing != null)
            {
                existing.Score = dto.Score;
                existing.RatedAt = DateTime.UtcNow;
            }
            else
            {
                _db.Ratings.Add(new Core.Entities.Rating
                {
                    UserId = _masterUserId,
                    MovieId = dto.MovieId,
                    Score = dto.Score,
                    RatedAt = DateTime.UtcNow
                });
            }

            await _db.SaveChangesAsync();
            return Ok();
        }

        // DELETE /api/admin/ratings/{movieId}
        [HttpDelete("{movieId:int}")]
        public async Task<IActionResult> Delete(int movieId)
        {
            var existing = await _db.Ratings
                .SingleOrDefaultAsync(r => r.UserId == _masterUserId && r.MovieId == movieId);
            if (existing == null) return NotFound();

            _db.Ratings.Remove(existing);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
