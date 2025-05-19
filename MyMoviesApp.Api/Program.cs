// File: MyMoviesApp.Api/Program.cs

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using MyMoviesApp.Infrastructure.Data;
using MyMoviesApp.Infrastructure.Services;
using MyMoviesApp.Infrastructure.Integration.Tmdb;
using MyMoviesApp.Core.Services;

var builder = WebApplication.CreateBuilder(args);

// (1) Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200",
                         "https://moovies4453.xyz",
                         "https://mymoviesappnew123-a5cugse7g8esg2gu.eastus2-01.azurewebsites.net/")

            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// (2) Database: Connect with Npgsql (PostgreSQL) using a real connection string
// e.g. "Host=localhost;Port=5432;Database=MyMoviesDb;Username=postgres;Password=secret;"
builder.Services.AddDbContext<ApplicationDbContext>(opts =>
    opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// (3) JWT Auth
var jwtKey = builder.Configuration["Jwt:Key"]
             ?? throw new InvalidOperationException("Jwt:Key missing.");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(opts =>
{
    opts.RequireHttpsMetadata = false;
    opts.SaveToken = true;
    opts.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

// (4) TMDb Client
builder.Services.AddHttpClient<ITmdbService, TmdbService>(client =>
{
    client.BaseAddress = new Uri("https://api.themoviedb.org/3/");
});

// (5) OpenAI Service
builder.Services.AddHttpClient<IOpenAiService, OpenAiService>();

// (6) Controllers & Logging
builder.Services.AddControllers();
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var app = builder.Build();

// For SPA static files (Angular build) if you’re serving it from .NET
app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

// (7) Enable CORS
app.UseCors("AllowMyFrontend");

// (8) Auth + Controllers
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// (9) Fallback for Angular SPA
app.MapFallbackToFile("index.html");

app.Run();
