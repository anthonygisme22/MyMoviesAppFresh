// File: MyMoviesApp.Infrastructure/Services/MasterRatingService.cs

using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyMoviesApp.Core.Entities;
using MyMoviesApp.Core.Interfaces;          // ITmdbService
using MyMoviesApp.Core.Services;           // IMasterRatingService
using MyMoviesApp.Infrastructure.Data;

namespace MyMoviesApp.Infrastructure.Services
{
    /// <summary>
    /// Upserts admin (master) ratings and auto‑ingests movies from TMDB.
    /// Uses dynamic binding so it compiles regardless of the exact MovieDetailsDto shape.
    /// </summary>
    public sealed class MasterRatingService : IMasterRatingService
    {
        private readonly ApplicationDbContext _db;
        private readonly ITmdbService _tmdb;

        public MasterRatingService(ApplicationDbContext db, ITmdbService tmdb)
        {
            _db = db;
            _tmdb = tmdb;
        }

        /// <inheritdoc />
        public async Task<int> AddOrUpdateAsync(
            int tmdbId, int score, int adminUserId, CancellationToken ct = default)
        {
            // 1️⃣ Ensure the movie exists locally
            var movie = await _db.Movies
                .SingleOrDefaultAsync(m => m.TmdbId == tmdbId.ToString(), ct);

            if (movie is null)
            {
                // Fetch TMDB metadata (returned type varies between solutions)
                dynamic tm = await _tmdb.GetMovieDetailsAsync(tmdbId.ToString());

                // dynamic look‑ups (compile‑time safe)
                string posterUrl = (string?)GetProp(tm, "PosterPath")
                                   ?? (string?)GetProp(tm, "PosterUrl")
                                   ?? string.Empty;

                string overview = (string?)GetProp(tm, "Overview") ?? string.Empty;
                string title = (string?)GetProp(tm, "Title") ?? $"TMDB {tmdbId}";
     
                string tmdbIdText = (string?)GetProp(tm, "TmdbId") ?? tmdbId.ToString();

                movie = new Movie
                {
                    TmdbId = tmdbIdText,
                    Title = title,
                    PosterUrl = posterUrl,
                    Overview = overview,
                
                    RatingCount = 0,
                    AverageRating = 0
                };

                _db.Movies.Add(movie);
                await _db.SaveChangesAsync(ct);   // obtain MovieId
            }

            // 2️⃣ Upsert admin rating
            var rating = await _db.Ratings.SingleOrDefaultAsync(
                r => r.UserId == adminUserId && r.MovieId == movie.MovieId, ct);

            if (rating is null)
            {
                _db.Ratings.Add(new Rating
                {
                    UserId = adminUserId,
                    MovieId = movie.MovieId,
                    Score = score,
                    RatedAt = DateTime.UtcNow
                });
            }
            else
            {
                rating.Score = score;
                rating.RatedAt = DateTime.UtcNow;
            }

            await _db.SaveChangesAsync(ct);
            return movie.MovieId;
        }

        // Helper: safely read a property via reflection from a dynamic object
        private static object? GetProp(dynamic obj, string name)
        {
            var prop = obj.GetType().GetProperty(name);
            return prop?.GetValue(obj);
        }
    }
}
