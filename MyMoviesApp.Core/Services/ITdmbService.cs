using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyMoviesApp.Core.Services
{
    /// <summary>
    /// Defines TMDb integration methods for searching and fetching movie details.
    /// </summary>
    public interface ITmdbService
    {
        Task<MovieSearchResultDto[]> SearchMoviesAsync(string query);
        Task<MovieDetailsDto> GetMovieDetailsAsync(string tmdbId);
    }

    /// <summary>
    /// Represents a single search result from TMDb.
    /// </summary>
    public record MovieSearchResultDto(
        string TmdbId,
        string Title,
        string ReleaseDate,
        string PosterPath
    );

    /// <summary>
    /// Represents detailed info (with cast) from TMDb.
    /// </summary>
    public record MovieDetailsDto(
        string TmdbId,
        string Title,
        string ReleaseDate,
        string Overview,
        List<CastMemberDto> Cast
    );

    /// <summary>
    /// A single cast member entry.
    /// </summary>
    public record CastMemberDto(
        string Name,
        string Character
    );
}
