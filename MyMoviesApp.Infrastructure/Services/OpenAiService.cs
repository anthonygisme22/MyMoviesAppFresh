// File: MyMoviesApp.Infrastructure/Services/OpenAiService.cs
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MyMoviesApp.Core.Interfaces;             // <-- implements interface from Core

namespace MyMoviesApp.Infrastructure.Services
{
    public class OpenAiService : IOpenAiService
    {
        private readonly HttpClient _http;
        private readonly string _model;
        private static readonly JsonSerializerOptions _jsonOpts =
            new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        public OpenAiService(HttpClient http, IConfiguration config)
        {
            _http = http;

            var apiKey = config["OpenAI:ApiKey"]
                         ?? throw new InvalidOperationException("OpenAI:ApiKey missing.");
            _model = config["OpenAI:Model"] ?? "gpt-3.5-turbo";

            _http.BaseAddress = new Uri("https://api.openai.com/v1/");
            _http.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", apiKey);
        }

        public async Task<string> GetChatCompletionAsync(string prompt)
        {
            var body = new
            {
                model = _model,
                messages = new[] {
                    new { role = "system", content = "You are a helpful movie recommendation assistant." },
                    new { role = "user",   content = prompt }
                },
                temperature = 0.8
            };

            var resp = await _http.PostAsync(
                "chat/completions",
                new StringContent(JsonSerializer.Serialize(body, _jsonOpts),
                                  Encoding.UTF8, "application/json"));

            if (!resp.IsSuccessStatusCode)
            {
                var txt = await resp.Content.ReadAsStringAsync();
                throw new InvalidOperationException($"OpenAI error {resp.StatusCode}: {txt}");
            }

            var doc = JsonDocument.Parse(await resp.Content.ReadAsStringAsync());
            var msg = doc.RootElement
                         .GetProperty("choices")[0]
                         .GetProperty("message")
                         .GetProperty("content")
                         .GetString();

            return msg?.Trim() ?? "";
        }
    }
}
