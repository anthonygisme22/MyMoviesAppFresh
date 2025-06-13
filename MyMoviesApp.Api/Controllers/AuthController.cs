// File: MyMoviesApp.Api/Controllers/AuthController.cs
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyMoviesApp.Core.Entities;
using MyMoviesApp.Infrastructure.Data;

namespace MyMoviesApp.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public sealed class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _cfg;

        public AuthController(ApplicationDbContext db, IConfiguration cfg)
        {
            _db = db;
            _cfg = cfg;
        }

        /* ───── DTOs ──────────────────────────────────────────────────── */
        public record RegisterDto(string Username, string Password);
        public record LoginDto(string Username, string Password);

        /* ───── POST /api/auth/register ───────────────────────────────── */
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Username) ||
                string.IsNullOrWhiteSpace(dto.Password) ||
                dto.Password.Length < 6)
                return BadRequest("Username and password (6+ chars) required.");

            if (await _db.Users.AnyAsync(u => u.Username == dto.Username))
                return BadRequest("Username already exists.");

            var role = dto.Username.Equals("admin", StringComparison.OrdinalIgnoreCase)
                     ? "Admin"
                     : "User";

            var user = new User
            {
                Username = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = role
            };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return Ok();
        }

        /* ───── POST /api/auth/login ──────────────────────────────────── */
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _db.Users
                .SingleOrDefaultAsync(u => u.Username == dto.Username);

            if (user == null ||
                !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized();

            /* ---------- build JWT claims -------------------------------- */
            var claims = new List<Claim> {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim("name", user.Username),
                new Claim(ClaimTypes.Role,
                    user.Username.Equals("admin", StringComparison.OrdinalIgnoreCase)
                      ? "Admin"
                      : user.Role ?? "User")
            };

            var key = Encoding.UTF8.GetBytes(_cfg["Jwt:Key"]!);
            var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _cfg["Jwt:Issuer"],
                audience: _cfg["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds);

            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
        }
    }
}
