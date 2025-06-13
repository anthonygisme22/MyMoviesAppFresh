using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMoviesApp.Core.Interfaces;
using MyMoviesApp.Infrastructure.Data;

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

        /* ───── DTOs ─────────────────────────────────────────────────── */
        public class RecommendationRequest { public string Prompt { get; set; } = ""; }
        public class RecommendationDto { public string Title { get; set; } = ""; public string Reason { get; set; } = ""; }

        /* ───── POST /api/recommendations ────────────────────────────── */
        [HttpPost]
        public async Task<IActionResult> Recommend([FromBody] RecommendationRequest req)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            /* Movies already rated by the user */
            var rated = await _db.Ratings
                .Where(r => r.UserId == userId)
                .Include(r => r.Movie)
                .Select(r => r.Movie.Title)
                .ToListAsync();

            /* Build system + user prompt */
            var systemPrompt =
                "You are a helpful movie recommendation assistant. " +
                "Respond ONLY with valid JSON array of objects [{\"Title\":\"...\",\"Reason\":\"...\"}]. " +
                "Exclude any movie already seen: " + string.Join(", ", rated) + ".";

            var fullPrompt = systemPrompt + "\nUser: " +
                             (string.IsNullOrWhiteSpace(req.Prompt)
                                 ? "Recommend some movies."
                                 : req.Prompt.Trim());

            /* Call OpenAI */
            var raw = await _openAi.GetChatCompletionAsync(fullPrompt);

            /* Try parse → fallback if invalid/empty -------------------- */
            RecommendationDto[] list;
            try
            {
                list = JsonSerializer.Deserialize<RecommendationDto[]>(raw)
                       ?? Array.Empty<RecommendationDto>();
            }
            catch
            {
                list = Array.Empty<RecommendationDto>();
            }

            if (list.Length == 0)
            {
                list = new[] {
                    new RecommendationDto {
                        Title  = "Inception",
                        Reason = "Fallback recommendation when no result returned."
                    }
                };
            }

            return Ok(list);
        }
    }
}
