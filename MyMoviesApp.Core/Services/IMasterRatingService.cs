// File: MyMoviesApp.Core/Services/IMasterRatingService.cs
using System.Threading;
using System.Threading.Tasks;

namespace MyMoviesApp.Core.Services
{
    /// <summary>Creates or updates the admin (master) rating for a movie.</summary>
    public interface IMasterRatingService
    {
        /// <returns>The local <c>MovieId</c> that was affected or created.</returns>
        Task<int> AddOrUpdateAsync(int tmdbId, int score, int adminUserId, CancellationToken ct = default);
    }
}
