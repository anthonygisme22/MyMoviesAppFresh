// File: MyMoviesApp.Api/Program.cs

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyMoviesApp.Core.Services;
using MyMoviesApp.Infrastructure.Data;
using MyMoviesApp.Infrastructure.Integration.Tmdb;    // ← TmdbService lives here
using MyMoviesApp.Infrastructure.Services;            // ← OpenAiService lives here
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// 1) Enable CORS so that Angular (http://localhost:4200) can call our API
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

// 3) Register ITmdbService → TmdbService via HttpClient factory
//    Here we explicitly set BaseAddress so TMDb URLs resolve correctly.
builder.Services
    .AddHttpClient<ITmdbService, TmdbService>(client =>
    {
        client.BaseAddress = new Uri("https://api.themoviedb.org/3/");
    });

// 4) Register IOpenAiService → OpenAiService via HttpClient factory
//    Explicitly set BaseAddress so OpenAI endpoints resolve correctly.
builder.Services
    .AddHttpClient<IOpenAiService, OpenAiService>(client =>
    {
        client.BaseAddress = new Uri("https://api.openai.com/v1/");
    });

// 5) Configure JWT Authentication (Jwt:Key, Issuer, Audience must exist in appsettings)
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

// 6) Add controllers & Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 7) (DEV) Auto-apply EF Core migrations
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

// 8) Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularDev");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
