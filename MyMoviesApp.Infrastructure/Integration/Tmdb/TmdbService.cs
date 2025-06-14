﻿using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MyMoviesApp.Core.Interfaces;

namespace MyMoviesApp.Infrastructure.Integration.Tmdb
{
    public class TmdbService : ITmdbService
    {
        private readonly HttpClient _http;
        private readonly string _apiKey;

        public TmdbService(HttpClient http, IConfiguration config)
        {
            _http = http;
            _http.BaseAddress = new Uri("https://api.themoviedb.org/3/");
            _apiKey = config["Tmdb:ApiKey"]
                      ?? throw new InvalidOperationException("Tmdb:ApiKey missing in configuration.");
        }

        public async Task<MovieSearchResultDto[]> SearchMoviesAsync(string query)
        {
            var url = $"search/movie?api_key={_apiKey}&query={Uri.EscapeDataString(query)}";
            var resp = await _http.GetFromJsonAsync<TmdbSearchResponse>(url);

            if (resp?.Results == null)
                return Array.Empty<MovieSearchResultDto>();

            return resp.Results
                       .Select(r => new MovieSearchResultDto(
                           r.Id.ToString(),
                           r.Title,
                           r.Release_Date,
                           r.Poster_Path
                       ))
                       .ToArray();
        }

        public async Task<MovieDetailsDto> GetMovieDetailsAsync(string tmdbId)
        {
            var url = $"movie/{tmdbId}?api_key={_apiKey}&append_to_response=credits";
            var resp = await _http.GetFromJsonAsync<TmdbDetailsResponse>(url)
                       ?? throw new InvalidOperationException($"No details for TMDb ID {tmdbId}");

            var cast = resp.Credits.Cast
                          .Select(c => new CastMemberDto(c.Name, c.Character))
                          .ToList();

            return new MovieDetailsDto(
                resp.Id.ToString(),
                resp.Title,
                resp.Release_Date,
                resp.Overview,
                cast
            );
        }

        public async Task<MovieSearchResultDto[]> GetTrendingMoviesAsync()
        {
            // TMDb “trending/movie/day”
            var url = $"trending/movie/day?api_key={_apiKey}";
            var resp = await _http.GetFromJsonAsync<TmdbTrendingResponse>(url);

            if (resp?.Results == null)
                return Array.Empty<MovieSearchResultDto>();

            return resp.Results
                       .Select(r => new MovieSearchResultDto(
                           r.Id.ToString(),
                           r.Title,
                           r.Release_Date,
                           r.Poster_Path
                       ))
                       .ToArray();
        }

        // Internal JSON mappings
        private record TmdbSearchResponse(int Page, TmdbMovie[] Results);
        private record TmdbMovie(int Id, string Title, string Release_Date, string Poster_Path);

        private record TmdbDetailsResponse(
            int Id,
            string Title,
            string Release_Date,
            string Overview,
            TmdbCredits Credits
        );
        private record TmdbCredits(TmdbCast[] Cast);
        private record TmdbCast(string Name, string Character);

        private record TmdbTrendingResponse(int Page, TmdbMovie[] Results);
    }
}
