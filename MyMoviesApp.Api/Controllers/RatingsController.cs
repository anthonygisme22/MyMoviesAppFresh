// File: MyMoviesApp.Api/Controllers/RatingsController.cs

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using MyMoviesApp.Core.Interfaces;
using MyMoviesApp.Core.DTOs;

namespace MyMoviesApp.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RatingsController : ControllerBase
    {
        private readonly IRatingService _ratingService;

        public RatingsController(IRatingService ratingService)
        {
            _ratingService = ratingService;
        }

        // GET api/ratings/user/{userId}/movie/{movieId}
        [HttpGet("user/{userId}/movie/{movieId}")]
        public async Task<IActionResult> GetUserRating(int userId, int movieId)
        {
            var rating = await _ratingService.GetUserRating(userId, movieId);
            if (rating == null) return NotFound();
            return Ok(rating);
        }

        // POST api/ratings
        [HttpPost]
        public async Task<IActionResult> Upsert([FromBody] RatingCreateDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _ratingService.UpsertRating(dto, userId);
            return Ok(result);
        }

        // GET api/ratings/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUser(int userId)
        {
            var ratings = await _ratingService.GetRatingsByUser(userId);
            return Ok(ratings);
        }

        // DELETE api/ratings/user/{userId}/movie/{movieId}
        [HttpDelete("user/{userId}/movie/{movieId}")]
        public async Task<IActionResult> Delete(int userId, int movieId)
        {
            var success = await _ratingService.RemoveRating(userId, movieId);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
