namespace MyMoviesApp.Core.Services.Dtos
{
    public record CastMemberDto(string Name, string Character);

    public record MovieDetailsDto(
        string TmdbId,
        string Title,
        string Overview,
        string ReleaseDate,
        string PosterPath,
        string[] Genres,
        CastMemberDto[] Cast
    );
}
