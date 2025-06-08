// File: MyMoviesApp.Core/Entities/Movie.cs

using System.Collections.Generic;

namespace MyMoviesApp.Core.Entities
{
    public class Movie
    {
        public int MovieId { get; set; }

        // In the database, TmdbId is stored as text
        public string TmdbId { get; set; }

        public string Title { get; set; }

        // These columns exist exactly as below in the “Movies” table
        public int RatingCount { get; set; }
        public string PosterUrl { get; set; }
        public double AverageRating { get; set; }
        public string Overview { get; set; }


        // Navigation property (Ratings table has a FK to Movies.MovieId)
        public List<Rating> Ratings { get; set; }
    }
}
