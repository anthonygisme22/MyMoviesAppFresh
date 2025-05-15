using System;

namespace MyMoviesApp.Core.Entities
{
    /// <summary>
    /// Allows admins to override certain movie details
    /// (e.g. corrected Title, PosterUrl).
    /// 
    /// For example, if TMDb has an incorrect or outdated
    /// title or poster, the admin can override here.
    /// 
    /// TmdbId is the unique reference to the movie from TMDb.
    /// </summary>
    public class MovieOverride
    {
        public int MovieOverrideId { get; set; }

        /// <summary>
        /// The TMDb ID of the movie (string to handle large IDs).
        /// </summary>
        public string TmdbId { get; set; } = null!;

        /// <summary>
        /// Optional custom title. If null, no override applies.
        /// </summary>
        public string? TitleOverride { get; set; }

        /// <summary>
        /// Optional custom poster URL. If null, no override applies.
        /// </summary>
        public string? PosterUrlOverride { get; set; }

        /// <summary>
        /// Last updated by an Admin
        /// </summary>
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
