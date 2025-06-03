// File: MyMoviesApp.Core/Interfaces/IRatingService.cs

using System.Collections.Generic;
using System.Threading.Tasks;
using MyMoviesApp.Core.DTOs;

namespace MyMoviesApp.Core.Interfaces
{
    public interface IRatingService
    {
        Task<RatingDto?> GetUserRating(int userId, int movieId);
        Task<IEnumerable<RatingDto>> GetRatingsByUser(int userId);
        Task<RatingDto> UpsertRating(RatingCreateDto dto, int userId);
        Task<bool> RemoveRating(int userId, int movieId);
    }
}
