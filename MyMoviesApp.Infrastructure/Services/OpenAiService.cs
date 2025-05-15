// File: MyMoviesApp.Infrastructure/Services/OpenAiService.cs

using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace MyMoviesApp.Infrastructure.Services
{
    public interface IOpenAiService
    {
        Task<string> GetChatCompletionAsync(string prompt);
    }

    public class OpenAiService : IOpenAiService
    {
        private readonly HttpClient _http;
        private readonly string _model;
        private static readonly JsonSerializerOptions _jsonOpts = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        public OpenAiService(HttpClient http, IConfiguration config)
        {
            _http = http;

            var apiKey = config["OpenAI:ApiKey"]
                         ?? throw new InvalidOperationException("OpenAI:ApiKey missing in configuration.");
            _model = config["OpenAI:Model"] ?? "gpt-3.5-turbo";

            // Configure HttpClient for public OpenAI
            _http.BaseAddress = new Uri("https://api.openai.com/v1/");
            _http.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", apiKey);
        }

        public async Task<string> GetChatCompletionAsync(string prompt)
        {
            var url = "chat/completions";

            var requestBody = new
            {
                model = _model,
                messages = new[]
                {
                    new { role = "system", content = "You are a helpful movie recommendation assistant." },
                    new { role = "user",   content = prompt }
                },
                temperature = 0.8
            };

            var json = JsonSerializer.Serialize(requestBody, _jsonOpts);
            using var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _http.PostAsync(url, content);
            if (!response.IsSuccessStatusCode)
            {
                var errorText = await response.Content.ReadAsStringAsync();
                throw new InvalidOperationException(
                    $"OpenAI API call failed ({response.StatusCode}): {errorText}"
                );
            }

            var responseJson = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(responseJson);

            var choices = doc.RootElement.GetProperty("choices");
            if (choices.GetArrayLength() == 0)
                return "";

            var message = choices[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            return message?.Trim() ?? "";
        }
    }
}
