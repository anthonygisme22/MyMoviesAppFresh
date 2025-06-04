// File: MyMoviesApp.Api/Program.cs

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyMoviesApp.Core.Services;      // ← for ITmdbService
using MyMoviesApp.Core.Interfaces;
using MyMoviesApp.Infrastructure.Data; // ← for ApplicationDbContext
using MyMoviesApp.Infrastructure.Integration.Tmdb;
using MyMoviesApp.Infrastructure.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// 1) Enable CORS so Angular (http://localhost:4200) can call our API
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

// 2) Register ApplicationDbContext (PostgreSQL)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"))
);

// 3) Register ITmdbService → TmdbService via HttpClient
builder.Services
    .AddHttpClient<ITmdbService, TmdbService>(client =>
    {
        client.BaseAddress = new Uri("https://api.themoviedb.org/3/");
    });

// 4) Register IOpenAiService → OpenAiService via HttpClient
builder.Services
    .AddHttpClient<IOpenAiService, OpenAiService>(client =>
    {
        client.BaseAddress = new Uri("https://api.openai.com/v1/");
    });

// 5) Register IRatingService → (only Upsert, Remove, GetUserRating, GetRatingsByUser remain)
builder.Services.AddScoped<IRatingService, RatingService>();

// 6) Configure JWT Authentication
var jwtKey = configuration["Jwt:Key"];
var jwtIssuer = configuration["Jwt:Issuer"];
var jwtAudience = configuration["Jwt:Audience"];
if (string.IsNullOrWhiteSpace(jwtKey) ||
    string.IsNullOrWhiteSpace(jwtIssuer) ||
    string.IsNullOrWhiteSpace(jwtAudience))
{
    throw new InvalidOperationException("Missing JWT configuration.");
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

// 7) Add controllers & Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 8) Auto-apply EF Core migrations (DEV only)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

// 9) Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularDev");
app.UseAuthentication();
app.UseAuthorization();

// 10) Map all controller endpoints
app.MapControllers();

app.Run();
