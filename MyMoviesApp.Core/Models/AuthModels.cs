namespace MyMoviesApp.Core.Models
{
    public record RegisterDto(string Username, string Password);
    public record LoginDto(string Username, string Password);
    public record AuthResponseDto(string Token, DateTime Expires);
}
