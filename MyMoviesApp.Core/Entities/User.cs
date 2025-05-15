namespace MyMoviesApp.Core.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; }      // "User" or "Admin"
        public ICollection<Rating> Ratings { get; set; }
        public ICollection<WatchlistItem> Watchlist { get; set; }
    }
}
