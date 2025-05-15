using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMoviesApp.Infrastructure.Data;

namespace MyMoviesApp.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class FeatureFlagsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public FeatureFlagsController(ApplicationDbContext db)
        {
            _db = db;
        }

        // GET api/featureflags
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var flags = await _db.FeatureFlags
                .Select(f => new FeatureFlagDto(f.FeatureFlagId, f.Name, f.IsEnabled))
                .ToListAsync();

            return Ok(flags);
        }

        // PUT api/featureflags/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateFeatureFlagDto dto)
        {
            var flag = await _db.FeatureFlags.FindAsync(id);
            if (flag == null) return NotFound();

            flag.IsEnabled = dto.IsEnabled;
            await _db.SaveChangesAsync();
            return NoContent();
        }

        public record FeatureFlagDto(int FeatureFlagId, string Name, bool IsEnabled);
        public record UpdateFeatureFlagDto(bool IsEnabled);
    }
}
