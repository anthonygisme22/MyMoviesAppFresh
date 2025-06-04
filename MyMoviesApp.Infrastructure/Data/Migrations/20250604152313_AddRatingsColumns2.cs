using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyMoviesApp.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddRatingsColumns2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RatingCount",
                table: "Movies",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "AverageRating",
                table: "Movies",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AverageRating",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "RatingCount",
                table: "Movies");
        }

    }
}
