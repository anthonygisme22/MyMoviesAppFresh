// File: MyMoviesApp.Api/Controllers/WatchlistController.cs

using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMoviesApp.Infrastructure.Data;
using MyMoviesApp.Core.Entities;

namespace MyMoviesApp.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class WatchlistController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public WatchlistController(ApplicationDbContext db) => _db = db;

        // GET /api/watchlist
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var items = await _db.WatchlistItems
                .Where(w => w.UserId == userId)
                .Include(w => w.Movie)
                .Select(w => new
                {
                    w.WatchlistItemId,
                    movie = new
                    {
                        w.Movie.MovieId,
                        w.Movie.TmdbId,
                        w.Movie.Title,
                        w.Movie.PosterUrl,
                        w.Movie.AverageRating,
                        w.Movie.RatingCount
                    },
                    w.AddedAt
                })
                .ToListAsync();
            return Ok(items);
        }

        // DTO for adding to watchlist
        public record WatchlistDto(int MovieId);

        // POST /api/watchlist
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] WatchlistDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            if (await _db.WatchlistItems
                    .AnyAsync(w => w.UserId == userId && w.MovieId == dto.MovieId))
            {
                return BadRequest("Already in watchlist.");
            }

            var movie = await _db.Movies.FindAsync(dto.MovieId);
            if (movie == null) return NotFound("Movie not found.");

            _db.WatchlistItems.Add(new WatchlistItem
            {
                UserId = userId,
                MovieId = dto.MovieId,
                AddedAt = DateTime.UtcNow
            });
            await _db.SaveChangesAsync();
            return Ok();
        }

        // DELETE /api/watchlist/{movieId}
        [HttpDelete("{movieId:int}")]
        public async Task<IActionResult> Remove(int movieId)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var item = await _db.WatchlistItems
                .SingleOrDefaultAsync(w => w.UserId == userId && w.MovieId == movieId);
            if (item == null) return NotFound();
            _db.WatchlistItems.Remove(item);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
