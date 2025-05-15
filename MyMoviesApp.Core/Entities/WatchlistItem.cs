namespace MyMoviesApp.Core.Entities
{
    public class WatchlistItem
    {
        public int WatchlistItemId { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public DateTime AddedAt { get; set; }
        public User User { get; set; }
        public Movie Movie { get; set; }
    }
}
