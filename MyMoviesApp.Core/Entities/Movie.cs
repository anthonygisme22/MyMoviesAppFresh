namespace MyMoviesApp.Core.Entities
{
    public class Movie
    {
        public int MovieId { get; set; }
        public string TmdbId { get; set; }        // external TMDb identifier
        public string Title { get; set; }
        public int Year { get; set; }
        public string PosterUrl { get; set; }
        public ICollection<Rating> Ratings { get; set; }
        public ICollection<WatchlistItem> WatchlistItems { get; set; }
    }
}
