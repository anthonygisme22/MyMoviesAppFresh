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

// 0) ── ADD CORS ────────────────────────────────────────────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyFrontend", policy =>
    {
        policy
            .WithOrigins(
              "https://moovies4453.xyz",     // your production Angular URL
              "http://localhost:4200"         // your local dev Angular URL
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// 1) ── Database ───────────────────────────────────────────────────────────
builder.Services.AddDbContext<ApplicationDbContext>(opts =>
    opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// 2) ── JWT Auth ────────────────────────────────────────────────────────────
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

// 3) ── TMDb Client ─────────────────────────────────────────────────────────
builder.Services.AddHttpClient<ITmdbService, TmdbService>(client =>
{
    client.BaseAddress = new Uri("https://api.themoviedb.org/3/");
});

// 4) ── OpenAI Service ──────────────────────────────────────────────────────
builder.Services.AddHttpClient<IOpenAiService, OpenAiService>();

// 5) ── Controllers ────────────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();


var app = builder.Build();

// ── Static Files + SPA Fallback ─────────────────────────────────────────
app.UseDefaultFiles();
app.UseStaticFiles();

// ── Dev Exception Page ───────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// ── HTTPS Redirection ────────────────────────────────────────────────────
app.UseHttpsRedirection();

// ── ENABLE CORS ───────────────────────────────────────────────────────────
app.UseCors("AllowMyFrontend");

// ── Authentication + Authorization ───────────────────────────────────────
app.UseAuthentication();
app.UseAuthorization();

// ── Map Controllers & SPA Fallback ──────────────────────────────────────
app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
