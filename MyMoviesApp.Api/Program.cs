// File: MyMoviesApp.Api/Program.cs

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyMoviesApp.Core.Services;                 // ITmdbService / IOpenAiService interfaces
using MyMoviesApp.Infrastructure.Data;
using MyMoviesApp.Infrastructure.Integration.Tmdb;
using MyMoviesApp.Infrastructure.Services;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// 1) CORS for Angular dev host
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

// 2) DbContext (PostgreSQL)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"))
);

// 3) TMDb & OpenAI via typed HttpClients
builder.Services.AddHttpClient<ITmdbService, TmdbService>(c =>
{
    c.BaseAddress = new Uri("https://api.themoviedb.org/3/");
});
builder.Services.AddHttpClient<IOpenAiService, OpenAiService>(c =>
{
    c.BaseAddress = new Uri("https://api.openai.com/v1/");
});

// 4) JWT auth
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

// 5) MVC / Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 6) Auto-migrate (dev / startup)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

// 7) Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// **NEW — serve Angular static files first**
app.UseDefaultFiles();   // looks for index.html / default.htm
app.UseStaticFiles();    // serves files in wwwroot

app.UseHttpsRedirection();
app.UseCors("AllowAngularDev");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// **NEW — client-side routing fallback**
app.MapFallbackToFile("index.html");

app.Run();
