using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace MyMoviesApp.Infrastructure.Data
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            // ===== Determine where the JSON file physically resides at design time =====
            // Because we linked in ../MyMoviesApp.Api/appsettings.json via the .csproj, 
            // at runtime this will be copied into the Infrastructure project's output folder.
            //
            // So Directory.GetCurrentDirectory() when we run "dotnet ef" inside Infrastructure
            // will point to bin/Debug/net8.0, which now contains appsettings.json.

            var basePath = Directory.GetCurrentDirectory();

            IConfigurationRoot config = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false)
                .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true)
                .AddEnvironmentVariables()
                .Build();

            // ===== Now read the connection string exactly as defined under "ConnectionStrings" =====
            string connString = config.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseNpgsql(connString);

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
