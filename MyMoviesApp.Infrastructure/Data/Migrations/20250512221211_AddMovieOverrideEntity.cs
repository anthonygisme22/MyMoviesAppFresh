using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MyMoviesApp.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMovieOverrideEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Username",
                table: "Users");

            migrationBuilder.CreateTable(
                name: "FeatureFlags",
                columns: table => new
                {
                    FeatureFlagId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IsEnabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeatureFlags", x => x.FeatureFlagId);
                });

            migrationBuilder.CreateTable(
                name: "MovieOverrides",
                columns: table => new
                {
                    MovieOverrideId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TmdbId = table.Column<string>(type: "text", nullable: false),
                    TitleOverride = table.Column<string>(type: "text", nullable: true),
                    PosterUrlOverride = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieOverrides", x => x.MovieOverrideId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Movies_TmdbId",
                table: "Movies",
                column: "TmdbId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MovieOverrides_TmdbId",
                table: "MovieOverrides",
                column: "TmdbId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeatureFlags");

            migrationBuilder.DropTable(
                name: "MovieOverrides");

            migrationBuilder.DropIndex(
                name: "IX_Movies_TmdbId",
                table: "Movies");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);
        }
    }
}
