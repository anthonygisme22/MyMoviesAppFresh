# MyMoviesApp

An ASP.NET Core (net8.0) API + Postgres + Angular (planned) movie management application with authentication, watchlists, ratings, AI recommendations, and admin overrides.

## Prerequisites

- .NET 8 SDK
- Docker (for Postgres)
- Optional: Node + Angular CLI (for the frontend, see milestone 10+)

## Setup & Run

1. **Clone** the repo
2. **Start** Postgres via Docker:
   ```bash
   docker run --name pg-mymovies \
     -e POSTGRES_PASSWORD=MySecret123 \
     -p 127.0.0.1:15432:5432 \
     -d postgres
