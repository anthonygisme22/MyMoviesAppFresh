namespace MyMoviesApp.Core.Services.Dtos
{
    public record MovieSearchResultDto(
        string TmdbId,
        string Title,
        string ReleaseDate,
        string PosterPath
    );
}
