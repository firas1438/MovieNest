## Introduction
**MovieNest** is a movie streaming and discovery platform where users can explore and enjoy movies and TV shows from every genre. Discover new favorites, revisit classics, and keep track of what you love, all in one seamless experience!

## Features
- **Browse Movies:** Navigate through a variety of movies pulled directly from TMDB. (The Movie Database)
- **Search Functionality:** Querying movies/shows using keywords.
- **Movie Details:** Using route parameters to display specific details including ratings, genres, release dates, and summaries.
- **Bookmarks:** Save movies and shows to your personal watchlist so you can revisit them anytime.

## Technologies
| Technology | Description |
|-------------|-------------|
| [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/) | React framework for building fast, server-rendered web applications. |
| [![Shadcn/UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/) | Beautifully designed, accessible components built with Radix and Tailwind. |
| [![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) | CSS framework for building responsive and modern user interfaces.|
| [![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/) | Backend-as-a-Service providing authentication, database, and API support. |
| [![Zustand](https://img.shields.io/badge/Zustand-4B5563?style=for-the-badge&logo=react&logoColor=white)](https://github.com/pmndrs/zustand) | Lightweight and intuitive state management for React. |
| [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/) | Containerization platform for consistent application deployment across environments. |
| [![TMDB](https://img.shields.io/badge/TMDB_API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/documentation/api) | Source for movie and TV show data. |

## Environment Variables
- `TMDB_API_KEY`: API key from The Movie Database 
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL 
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key 
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase admin key 

##  Docker Setup
This project is fully containerized. Run it using **Docker** for a consistent development and production environment.

1. **Ensure Docker and Docker Compose are installed**  
   You’ll need both Docker and Docker Compose installed on your machine.
   - [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)  
   - Verify installation by running `docker --version` and `docker compose version` in your terminal.

2. **Create your environment file**  
   In the root of the project, create a file named `.env` and add your environment variables (see `.env.example` for reference).  
   > Make sure not to commit this file to version control (it contains sensitive information).

3. **Build and run the container**  
   From the project directory, run:  
   ```bash
   docker compose up --build
   ```

4. **Access the app**  
   Once the build is complete, open your browser and go to:  
   ```bash
   http://localhost:3000
   ```

5. **Stop the container**  
   To stop the app, press **Ctrl + C** or run:  
   ```bash
   docker compose stop
   ```

6. **Restart the container (without rebuilding)**  
   To start it again later, use:  
   ```bash
   docker compose start
   ```

## Local Development 
If you prefer running the project without Docker:
1. Clone the repository  
   ```bash
   git clone https://github.com/firas1438/MovieNest.git
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Run the development server  
   ```bash
   npm run dev
   ```

## Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.