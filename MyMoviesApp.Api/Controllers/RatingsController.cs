using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MyMoviesApp.Core.Entities;
using MyMoviesApp.Infrastructure.Data;
using MyMoviesApp.Infrastructure.Services;

namespace MyMoviesApp.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RatingsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly CsvImportService _csvService;
        private readonly IConfiguration _config;

        public RatingsController(
            ApplicationDbContext db,
            CsvImportService csvService,
            IConfiguration config)
        {
            _db = db;
            _csvService = csvService;
            _config = config;
        }

        // GET /api/ratings
        [HttpGet]
        public async Task<IActionResult> GetMyRatings()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var ratings = await _db.Ratings
                .Where(r => r.UserId == userId)
                .Include(r => r.Movie)
                .Select(r => new {
                    r.RatingId,
                    r.MovieId,
                    movieTitle = r.Movie.Title,
                    r.Score,
                    ratedAt = r.RatedAt
                })
                .ToListAsync();
            return Ok(ratings);
        }

        // GET /api/ratings/master
        [HttpGet("master")]
        public async Task<IActionResult> GetMasterRatings()
        {
            var masterUserId = _config.GetValue<int>("MasterUserId");
            var ratings = await _db.Ratings
                .Where(r => r.UserId == masterUserId)
                .Include(r => r.Movie)
                .Select(r => new {
                    r.RatingId,
                    r.MovieId,
                    movieTitle = r.Movie.Title,
                    r.Score,
                    ratedAt = r.RatedAt
                })
                .ToListAsync();
            return Ok(ratings);
        }

        // -- remaining endpoints unchanged --
        // GET /api/ratings/{movieId}/user-rating
        // POST /api/ratings
        // DELETE /api/ratings/{movieId}
        // POST /api/ratings/csv-import
    }
}
