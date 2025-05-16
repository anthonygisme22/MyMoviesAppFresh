// File: MyMoviesApp.Api/Controllers/AuthController.cs
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyMoviesApp.Core.Entities;
using MyMoviesApp.Core.Models;
using MyMoviesApp.Infrastructure.Data;

namespace MyMoviesApp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")] // so /auth (no "api/")
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _config;

        public AuthController(ApplicationDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            // Check if username exists
            if (await _db.Users.AnyAsync(u => u.Username == dto.Username))
            {
                return BadRequest("Username already exists.");
            }

            // Create user
            var user = new User
            {
                Username = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "User"
            };

            // Save to DB
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto dto)
        {
            // Validate user
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Username == dto.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid credentials.");
            }

            // Grab JWT key from config
            var keyString = _config["Jwt:Key"]
                ?? throw new InvalidOperationException("JWT 'Key' missing in configuration.");

            var keyBytes = Encoding.UTF8.GetBytes(keyString);
            var issuer = _config["Jwt:Issuer"];
            var audience = _config["Jwt:Audience"];

            // Build claims
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddHours(3),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(keyBytes),
                    SecurityAlgorithms.HmacSha256
                )
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(new AuthResponseDto(jwt, token.ValidTo));
        }
    }
}
