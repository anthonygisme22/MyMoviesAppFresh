// File: MyMoviesApp.Api/Program.cs
using System;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using MyMoviesApp.Core.Interfaces;
using MyMoviesApp.Core.Services;
using MyMoviesApp.Infrastructure.Data;
using MyMoviesApp.Infrastructure.Integration.Tmdb;
using MyMoviesApp.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

/* 1 CORS */
builder.Services.AddCors(o => o.AddPolicy("AllowAngularDev", p =>
    p.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod()));

/* 2 DbContext */
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
    opt.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

/* 3 Http clients */
builder.Services.AddHttpClient<ITmdbService, TmdbService>(c =>
    c.BaseAddress = new Uri("https://api.themoviedb.org/3/"));
builder.Services.AddHttpClient<IOpenAiService, OpenAiService>(c =>
    c.BaseAddress = new Uri("https://api.openai.com/v1/"));

/* 4 Domain services */
builder.Services.AddScoped<IRatingService, RatingService>();
builder.Services.AddScoped<IMasterRatingService, MasterRatingService>();

/* 5 JWT auth */
var key = configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key missing");
var issuer = configuration["Jwt:Issuer"] ?? "MyMoviesApp";
var audience = configuration["Jwt:Audience"] ?? "MyMoviesApp";
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            ValidAudience = audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };
    });

/* 6 Authorization – flexible Admin policy */
builder.Services.AddAuthorization(opts =>
{
    opts.AddPolicy("AdminUserOnly", policy =>
        policy.RequireAssertion(ctx =>
        {
            // Accept any common claim key that equals "admin" (case‑insensitive)
            string? username =
                   ctx.User.FindFirst("Username")?.Value ??
                   ctx.User.FindFirst("username")?.Value ??
                   ctx.User.FindFirst("unique_name")?.Value ??
                   ctx.User.FindFirst(ClaimTypes.Name)?.Value;

            return username?.Equals("admin", StringComparison.OrdinalIgnoreCase) == true;
        }));
});

/* 7 Controllers & Swagger */
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

/* 8 Dev helpers */
if (app.Environment.IsDevelopment())
{
    using var s = app.Services.CreateScope();
    s.ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.Migrate();
    app.UseSwagger();
    app.UseSwaggerUI();
}

/* 9 Pipeline */
app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("AllowAngularDev");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.UseRewriter(new RewriteOptions().Add(ctx =>
{
    var p = ctx.HttpContext.Request.Path.Value!;
    if (!p.StartsWith("/api") && !p.StartsWith("/swagger") && !System.IO.Path.HasExtension(p))
        ctx.HttpContext.Request.Path = "/index.html";
}));

app.Run();
