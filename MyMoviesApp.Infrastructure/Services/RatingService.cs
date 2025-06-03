// File: MyMoviesApp.Infrastructure/Services/RatingService.cs

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyMoviesApp.Core.DTOs;
using MyMoviesApp.Core.Interfaces;
using MyMoviesApp.Infrastructure.Data;
using MyMoviesApp.Core.Entities;

namespace MyMoviesApp.Infrastructure.Services
{
    public class RatingService : IRatingService
    {
        private readonly ApplicationDbContext _db;

        public RatingService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<RatingDto?> GetUserRating(int userId, int movieId)
        {
            var r = await _db.Ratings
                .AsNoTracking()
                .Where(x => x.UserId == userId && x.MovieId == movieId)
                .Select(x => new RatingDto(x.MovieId, x.Score))
                .FirstOrDefaultAsync();

            return r;
        }

        public async Task<IEnumerable<RatingDto>> GetRatingsByUser(int userId)
        {
            return await _db.Ratings
                .AsNoTracking()
                .Where(x => x.UserId == userId)
                .Select(x => new RatingDto(x.MovieId, x.Score))
                .ToListAsync();
        }

        public async Task<RatingDto> UpsertRating(RatingCreateDto dto, int userId)
        {
            var existing = await _db.Ratings
                .SingleOrDefaultAsync(x => x.UserId == userId && x.MovieId == dto.MovieId);

            if (existing != null)
            {
                existing.Score = dto.Score;
                _db.Ratings.Update(existing);
            }
            else
            {
                var newRating = new Rating
                {
                    UserId = userId,
                    MovieId = dto.MovieId,
                    Score = dto.Score
                };
                await _db.Ratings.AddAsync(newRating);
            }

            await _db.SaveChangesAsync();

            return new RatingDto(dto.MovieId, dto.Score);
        }

        public async Task<bool> RemoveRating(int userId, int movieId)
        {
            var existing = await _db.Ratings
                .SingleOrDefaultAsync(x => x.UserId == userId && x.MovieId == movieId);
            if (existing == null) return false;

            _db.Ratings.Remove(existing);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
