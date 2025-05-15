// File: MyMoviesApp.Api/Controllers/RecommendationsController.cs

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using MyMoviesApp.Infrastructure.Data;
using MyMoviesApp.Infrastructure.Services;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace MyMoviesApp.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationsController : ControllerBase
    {
        private readonly IOpenAiService _openAi;
        private readonly ApplicationDbContext _db;

        public RecommendationsController(IOpenAiService openAi, ApplicationDbContext db)
        {
            _openAi = openAi;
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> Recommend([FromBody] RecommendationRequest req)
        {
            try
            {
                var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var ratedTitles = await _db.Ratings
                    .Where(r => r.UserId == userId)
                    .Select(r => r.Movie.Title)
                    .ToListAsync();

                var systemPrompt =
                    "You are a helpful movie recommendation assistant. " +
                    "Respond only in valid JSON. " +
                    $"User has already seen: {string.Join(", ", ratedTitles)}. " +
                    "Don't recommend those.";

                var userPrompt = string.IsNullOrWhiteSpace(req.Prompt)
                    ? "Recommend me some movies"
                    : req.Prompt;

                var fullPrompt = systemPrompt + "\nUser: " + userPrompt;

                var response = await _openAi.GetChatCompletionAsync(fullPrompt);

                var recs = JsonSerializer.Deserialize<RecommendationDto[]>(response);
                if (recs == null) recs = Array.Empty<RecommendationDto>();
                return Ok(recs);
            }
            catch (InvalidOperationException ex)
            {
                // Likely an issue with the OpenAI call
                return BadRequest(new { error = ex.Message });
            }
            catch (JsonException)
            {
                // Malformed JSON from AI
                return Ok(new { rawResponse = await _openAi.GetChatCompletionAsync(req.Prompt) });
            }
            catch (Exception ex)
            {
                // Unexpected error
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }

    public class RecommendationRequest
    {
        public string Prompt { get; set; }
    }

    public class RecommendationDto
    {
        public string Title { get; set; }
        public string Reason { get; set; }
    }
}
