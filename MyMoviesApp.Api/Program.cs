// File: MyMoviesApp.Api/Program.cs   (FULL FILE)
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using MyMoviesApp.Core.Interfaces;
using MyMoviesApp.Core.Services;                // ← NEW
using MyMoviesApp.Infrastructure.Data;
using MyMoviesApp.Infrastructure.Integration.Tmdb;
using MyMoviesApp.Infrastructure.Services;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// 1) CORS ----------------------------------------------------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// 2) DbContext -----------------------------------------------------------------
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

// 3) TMDB & other HTTP clients -------------------------------------------------
builder.Services.AddHttpClient<ITmdbService, TmdbService>(c =>
    c.BaseAddress = new Uri("https://api.themoviedb.org/3/"));

builder.Services.AddHttpClient<IOpenAiService, OpenAiService>(c =>
    c.BaseAddress = new Uri("https://api.openai.com/v1/"));

// 4) Domain services -----------------------------------------------------------
builder.Services.AddScoped<IRatingService, RatingService>();
builder.Services.AddScoped<IMasterRatingService, MasterRatingService>();   // ← NEW

// 5) Authentication ------------------------------------------------------------
var key = configuration["Jwt:Key"] ?? throw new InvalidOperationException("Missing Jwt:Key");
var issuer = configuration["Jwt:Issuer"] ?? throw new InvalidOperationException("Missing Jwt:Issuer");
var audience = configuration["Jwt:Audience"] ?? throw new InvalidOperationException("Missing Jwt:Audience");

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opts =>
    {
        opts.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            ValidAudience = audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };
    });

// 6) Controllers & Swagger -----------------------------------------------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 7) Dev helpers ---------------------------------------------------------------
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    scope.ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.Migrate();

    app.UseSwagger();
    app.UseSwaggerUI();
}

// 8) Pipeline ------------------------------------------------------------------
app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("AllowAngularDev");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Rewrite all non‑API paths to index.html for SPA routing
app.UseRewriter(new RewriteOptions().Add(context =>
{
    var path = context.HttpContext.Request.Path.Value!;
    if (!path.StartsWith("/api", StringComparison.OrdinalIgnoreCase) &&
        !path.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase) &&
        !System.IO.Path.HasExtension(path))
    {
        context.HttpContext.Request.Path = "/index.html";
    }
}));

app.Run();
