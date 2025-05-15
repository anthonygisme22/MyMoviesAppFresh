using Microsoft.EntityFrameworkCore;
using MyMoviesApp.Core.Entities;

namespace MyMoviesApp.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Existing DbSets
        public DbSet<Movie> Movies { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Rating> Ratings { get; set; } = null!;
        public DbSet<WatchlistItem> WatchlistItems { get; set; } = null!;
        public DbSet<FeatureFlag> FeatureFlags { get; set; } = null!;

        // NEW:
        public DbSet<MovieOverride> MovieOverrides { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Example: we can specify constraints, indexes, etc.
            modelBuilder.Entity<Movie>()
                .HasIndex(m => m.TmdbId)
                .IsUnique();

            modelBuilder.Entity<MovieOverride>()
                .HasIndex(mo => mo.TmdbId)
                .IsUnique();

            // Additional model configuration as needed...
        }
    }
}
