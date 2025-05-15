using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMoviesApp.Core.Entities;
using MyMoviesApp.Infrastructure.Data;
using System;

namespace MyMoviesApp.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public AdminController(ApplicationDbContext db)
        {
            _db = db;
        }

        // -----------------------------------------------------
        //  FEATURE FLAG ENDPOINTS
        // -----------------------------------------------------

        /// <summary>
        /// Toggle or create a feature flag by name.
        /// Example: POST /api/admin/features/AiRecommendations?enabled=true
        /// </summary>
        [HttpPost("features/{name}")]
        public async Task<IActionResult> ToggleFeature([FromRoute] string name, [FromQuery] bool enabled)
        {
            var flag = await _db.FeatureFlags.SingleOrDefaultAsync(f => f.Name == name);

            if (flag == null)
            {
                flag = new FeatureFlag { Name = name, IsEnabled = enabled };
                _db.FeatureFlags.Add(flag);
            }
            else
            {
                flag.IsEnabled = enabled;
            }

            await _db.SaveChangesAsync();
            return Ok(new { name, isEnabled = flag.IsEnabled });
        }

        /// <summary>
        /// Get all feature flags
        /// </summary>
        [HttpGet("features")]
        public async Task<IActionResult> GetFeatures()
        {
            var flags = await _db.FeatureFlags.ToListAsync();
            return Ok(flags);
        }

        // -----------------------------------------------------
        //  MOVIE OVERRIDE ENDPOINTS
        // -----------------------------------------------------

        /// <summary>
        /// Create or update a MovieOverride by TmdbId.
        /// POST /api/admin/movie-overrides
        /// Body: { "tmdbId": "12345", "titleOverride": "My New Title", "posterUrlOverride": "http..." }
        /// </summary>
        [HttpPost("movie-overrides")]
        public async Task<IActionResult> UpsertOverride([FromBody] MovieOverrideDto dto)
        {
            var existing = await _db.MovieOverrides
                .SingleOrDefaultAsync(mo => mo.TmdbId == dto.TmdbId);

            if (existing == null)
            {
                // Create new override
                var newOverride = new MovieOverride
                {
                    TmdbId = dto.TmdbId,
                    TitleOverride = dto.TitleOverride,
                    PosterUrlOverride = dto.PosterUrlOverride,
                    UpdatedAt = DateTime.UtcNow
                };
                _db.MovieOverrides.Add(newOverride);
            }
            else
            {
                // Update existing
                existing.TitleOverride = dto.TitleOverride;
                existing.PosterUrlOverride = dto.PosterUrlOverride;
                existing.UpdatedAt = DateTime.UtcNow;
            }

            await _db.SaveChangesAsync();
            return Ok("Override saved.");
        }

        /// <summary>
        /// Get all overrides
        /// </summary>
        [HttpGet("movie-overrides")]
        public async Task<IActionResult> GetAllOverrides()
        {
            var overrides = await _db.MovieOverrides.ToListAsync();
            return Ok(overrides);
        }

        /// <summary>
        /// Delete a movie override by TmdbId
        /// Example: DELETE /api/admin/movie-overrides/12345
        /// </summary>
        [HttpDelete("movie-overrides/{tmdbId}")]
        public async Task<IActionResult> DeleteOverride(string tmdbId)
        {
            var existing = await _db.MovieOverrides
                .SingleOrDefaultAsync(mo => mo.TmdbId == tmdbId);

            if (existing == null)
                return NotFound("No override found for that TmdbId");

            _db.MovieOverrides.Remove(existing);
            await _db.SaveChangesAsync();
            return Ok("Override deleted.");
        }
    }

    /// <summary>
    /// DTO for creating/updating a MovieOverride
    /// </summary>
    public class MovieOverrideDto
    {
        public string TmdbId { get; set; } = null!;
        public string? TitleOverride { get; set; }
        public string? PosterUrlOverride { get; set; }
    }
}
