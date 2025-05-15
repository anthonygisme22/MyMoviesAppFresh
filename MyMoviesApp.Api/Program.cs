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

// 1) Database
builder.Services.AddDbContext<ApplicationDbContext>(opts =>
    opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// 2) JWT Auth
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

// 3) TMDB Client
builder.Services.AddHttpClient<ITmdbService, TmdbService>(client =>
{
    client.BaseAddress = new Uri("https://api.themoviedb.org/3/");
});

// 4) Public OpenAI Service
builder.Services.AddHttpClient<IOpenAiService, OpenAiService>();

// 5) Controllers
builder.Services.AddControllers();

var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("index.html");
app.Run();
