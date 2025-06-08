// File: MyMoviesApp.Api/Contracts/Admin/AddMasterRatingRequest.cs
namespace MyMoviesApp.Api.Contracts.Admin
{
    /// <summary>Adds or updates a master rating for a movie identified by its TMDB ID.</summary>
    /// <param name="TmdbId">The TMDB numeric identifier.</param>
    /// <param name="Score">Rating 1‑100.</param>
    public sealed record AddMasterRatingRequest(int TmdbId, int Score);
}
