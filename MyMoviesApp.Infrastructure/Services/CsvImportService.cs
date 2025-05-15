using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CsvHelper;
using Microsoft.EntityFrameworkCore;
using MyMoviesApp.Core.Entities;
using MyMoviesApp.Core.Services;
using MyMoviesApp.Infrastructure.Data;

namespace MyMoviesApp.Infrastructure.Services
{
    public class CsvImportService
    {
        private readonly ApplicationDbContext _db;
        private readonly ITmdbService _tmdb;

        public CsvImportService(ApplicationDbContext db, ITmdbService tmdb)
        {
            _db = db;
            _tmdb = tmdb;
        }

        /// <summary>
        /// Imports rows of [Title,Year,Rating] from the stream into the database.
        /// </summary>
        public async Task ImportRatingsAsync(Stream csvStream, int userId)
        {
            using var reader = new StreamReader(csvStream);
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

            await foreach (var record in csv.GetRecordsAsync<CsvRecord>())
            {
                if (string.IsNullOrWhiteSpace(record.Title))
                    continue;

                // Try find existing movie by title+year
                var movie = await _db.Movies
                    .FirstOrDefaultAsync(m =>
                        m.Title == record.Title.Trim() &&
                        m.Year == record.Year);

                if (movie == null)
                {
                    // Fetch from TMDb
                    var results = await _tmdb.SearchMoviesAsync(record.Title);
                    var match = results.FirstOrDefault(r =>
                    {
                        if (!DateTime.TryParse(r.ReleaseDate, out var dt))
                            return false;
                        return dt.Year == record.Year
                               && string.Equals(r.Title, record.Title, StringComparison.OrdinalIgnoreCase);
                    });

                    if (match != null)
                    {
                        movie = new Movie
                        {
                            TmdbId = match.TmdbId,
                            Title = match.Title,
                            Year = record.Year,
                            PosterUrl = match.PosterPath
                        };
                        _db.Movies.Add(movie);
                        await _db.SaveChangesAsync();
                    }
                }

                if (movie == null)
                    continue;

                // Upsert user rating
                var existing = await _db.Ratings
                    .SingleOrDefaultAsync(r => r.UserId == userId && r.MovieId == movie.MovieId);

                if (existing != null)
                {
                    existing.Score = record.Rating;
                    existing.RatedAt = DateTime.UtcNow;
                }
                else
                {
                    _db.Ratings.Add(new Rating
                    {
                        UserId = userId,
                        MovieId = movie.MovieId,
                        Score = record.Rating,
                        RatedAt = DateTime.UtcNow
                    });
                }

                await _db.SaveChangesAsync();
            }
        }

        // Internal CSV mapping type
        private record CsvRecord(string Title, int Year, int Rating);
    }
}
