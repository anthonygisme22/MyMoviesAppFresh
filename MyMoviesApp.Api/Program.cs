// File: MyMoviesApp.Api/Program.cs

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using MyMoviesApp.Core.Interfaces;
using MyMoviesApp.Infrastructure.Data;
using MyMoviesApp.Infrastructure.Integration.Tmdb;
using MyMoviesApp.Infrastructure.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// ----------------------------------------------------------------------------------------------------
// 1) Add CORS so the Angular dev server (http://localhost:4200) can call our API in development
// ----------------------------------------------------------------------------------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ----------------------------------------------------------------------------------------------------
// 2) Register the PostgreSQL ApplicationDbContext (EF Core) using the connection string from appsettings.json
// ----------------------------------------------------------------------------------------------------
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"))
);

// ----------------------------------------------------------------------------------------------------
// 3) Register ITmdbService → TmdbService (calls TMDb API via HttpClient factory)
// ----------------------------------------------------------------------------------------------------
builder.Services
    .AddHttpClient<ITmdbService, TmdbService>(client =>
    {
        client.BaseAddress = new Uri("https://api.themoviedb.org/3/");
    });

// ----------------------------------------------------------------------------------------------------
// 4) Register IOpenAiService → OpenAiService (calls OpenAI via HttpClient factory)
// ----------------------------------------------------------------------------------------------------
builder.Services
    .AddHttpClient<IOpenAiService, OpenAiService>(client =>
    {
        client.BaseAddress = new Uri("https://api.openai.com/v1/");
    });

// ----------------------------------------------------------------------------------------------------
// 5) Register IRatingService → RatingService (our implementation in Infrastructure)
// ----------------------------------------------------------------------------------------------------
builder.Services.AddScoped<IRatingService, RatingService>();

// ----------------------------------------------------------------------------------------------------
// 6) Configure JWT Authentication (reads Jwt:Key, Issuer, Audience from appsettings.json)
// ----------------------------------------------------------------------------------------------------
var jwtKey = configuration["Jwt:Key"];
var jwtIssuer = configuration["Jwt:Issuer"];
var jwtAudience = configuration["Jwt:Audience"];
if (string.IsNullOrWhiteSpace(jwtKey) ||
    string.IsNullOrWhiteSpace(jwtIssuer) ||
    string.IsNullOrWhiteSpace(jwtAudience))
{
    throw new InvalidOperationException("Missing JWT configuration in appsettings.json");
}

var keyBytes = Encoding.UTF8.GetBytes(jwtKey);
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
        };
    });

// ----------------------------------------------------------------------------------------------------
// 7) Add Controllers + Swagger (so API endpoints work and Swagger UI is available in Development)
// ----------------------------------------------------------------------------------------------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ----------------------------------------------------------------------------------------------------
// 8) In Development: Auto‐apply EF Core migrations, enable Swagger UI
// ----------------------------------------------------------------------------------------------------
if (app.Environment.IsDevelopment())
{
    // Auto‐apply pending EF Migrations
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        db.Database.Migrate();
    }

    // Enable Swagger & Swagger UI
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ----------------------------------------------------------------------------------------------------
// 9) Configure middleware pipeline
//
//   - UseHttpsRedirection: redirect HTTP → HTTPS (note: in Azure this may be offloaded, but it’s safe to keep)
//   - UseStaticFiles: serve the files in wwwroot (our Angular build) as static content
//   - UseDefaultFiles: serves index.html by default if no file is specified
//   - UseRewriter: catch‐all rewrite rule to redirect any non‐API path to index.html
//   - UseRouting, UseCors, UseAuthentication, UseAuthorization, MapControllers
// ----------------------------------------------------------------------------------------------------
app.UseHttpsRedirection();

// Serve default files (index.html) and any static files from wwwroot:
app.UseDefaultFiles();     // looks for index.html by default if no path is specified
app.UseStaticFiles();

// CORS policy for Angular dev (only applies if the origin matches)
app.UseCors("AllowAngularDev");

// Authentication / Authorization for API endpoints
app.UseAuthentication();
app.UseAuthorization();

// Map API controllers under /api/*
app.MapControllers();

// ----------------------------------------------------------------------------------------------------
// 10) Rewrite any non‐API request to serve index.html (so Angular client‐side routes work).
//     We only want to rewrite if the request path does not start with “/api/”
// ----------------------------------------------------------------------------------------------------
var rewriteOptions = new RewriteOptions()
    // If the request does not start with “/api” and is not calling an existing file,
    // rewrite to “/index.html” so Angular’s router can take over.
    .Add(context =>
    {
        var requestPath = context.HttpContext.Request.Path.Value!;

        // If the request path starts with “/api” or “/swagger” or is for an actual file
        // (e.g. *.js, *.css, *.png, etc.), do nothing. Otherwise, rewrite to “/index.html”.
        if (!requestPath.StartsWith("/api", StringComparison.OrdinalIgnoreCase) &&
            !requestPath.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase) &&
            !System.IO.Path.HasExtension(requestPath))
        {
            context.Result = RuleResult.SkipRemainingRules;
            context.HttpContext.Request.Path = "/index.html";
        }
    });

app.UseRewriter(rewriteOptions);

// ----------------------------------------------------------------------------------------------------
// 11) Finally, run the application
// ----------------------------------------------------------------------------------------------------
app.Run();
