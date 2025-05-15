namespace MyMoviesApp.Core.Entities
{
    public class Rating
    {
        public int RatingId { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public int Score { get; set; }        // e.g. 1–10
        public DateTime RatedAt { get; set; }
        public User User { get; set; }
        public Movie Movie { get; set; }
    }
}
