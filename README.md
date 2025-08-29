# 🎬 Your Personal Movie Hub

Discover, share, and vote for movies you love!  
Search movies instantly from TMDB, add movies you like, upvote community picks, and join conversations with comments.

---

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Pages & Routes](#pages--routes)
- [Models](#models)
- [API Endpoints](#api-endpoints)
  - [Authentication Routes](#authentication-routes-apiauth)
  - [TMDB Routes](#tmdb-routes-apitmdb)
  - [Movie Routes](#movie-routes-apimovies)
  - [Comment Routes](#comment-routes-apicomments)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

---

## 📝 Project Overview

Your Personal Movie Hub is a web application for movie enthusiasts to:

- Search movies via the TMDB API.
- Add and share favorite movies with the community.
- Upvote movies and see trending picks.
- Comment and join discussions about movies.
- Manage personal profiles and watchlists.

---

## ⚡ Features

- **TMDB Search:** Instant search with movie details.  
- **Movie Collection:** Users can add movies to their personal hub.  
- **Community Voting:** Upvote movies; see top-rated community picks.  
- **Comments:** Add, edit, and delete comments on movies.  
- **Authentication:** Email/password login and Google OAuth.  
- **User Dashboard:** Profile, added movies, and watchlist management.  

---

## 🌐 Pages & Routes

| Page | Route | Purpose | Features / UI Elements | Backend APIs Used |
|------|-------|--------|-----------------------|-----------------|
| Home | `/` | Hero section with header, footer, and movie search. | Search movies using TMDB API; Add movie button disabled if not logged in | `POST /api/movies`, `GET /api/tmdb/search?query=` |
| Explore | `/explore` | Show all movies added by users | List all movies | `GET /api/movies`, `GET /api/movies/filter/votes` |
| Movie Details | `/movies/:id` | Show details of a specific movie | Movie info, poster, votes, comments (view/add with login) | `GET /api/movies/:id`, `GET /api/tmdb/details/:tmdbId`, `GET /api/comments/:movieId`, `POST /api/comments`, `POST /api/movies/:id/vote` |
| Signup | `/signup` | Register new users | Form (name, email, password), redirect to login on success | `POST /api/auth/signup` |
| Login | `/login` | User login with email/password or Google | Form + Google login, redirect to dashboard on success | `POST /api/auth/login`, `GET /api/auth/google` |
| Google OAuth Redirect | `/auth/google/callback` | Handle Google login callback | Loading spinner while exchanging token, redirect to dashboard | `GET /api/auth/google/callback` |
| Dashboard / Profile | `/dashboard` | Show user profile, movies they added, watchlist | User info, added movies list, watchlist display | `GET /api/movies/:id`, `GET /api/auth/me` |

---

## 🗂️ Models

| Model | Fields | Description |
|-------|-------|------------|
| **User** | `_id`, `name`, `email`, `password`, `googleId`, `bio`, `favoriteGenres`, `watchlist`, `createdAt`, `updatedAt` | Stores user info; supports email/password login and Google OAuth. |
| **Movie** | `_id`, `tmdbId`, `title`, `overview`, `posterPath`, `releaseDate`, `addedBy`, `votes`, `voters`, `createdAt`, `updatedAt` | Stores user-added movies with community voting. `tmdbId` links to TMDB API. |
| **Comment** | `_id`, `movie` (ref Movie), `user` (ref User), `text`, `createdAt`, `updatedAt` | Stores comments per movie; linked to movie and user. |

---

## 🔑 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Route | Protected | Body / Query | Description |
|-------|-------|----------|--------------|------------|
| POST | `/signup` | ❌ | `{ name, email, password }` | Register user; returns JWT |
| POST | `/login` | ❌ | `{ email, password }` | Login user; returns JWT |
| GET | `/logout` | ✅ | — | Logout user (clears JWT cookie) |
| GET | `/google` | ❌ | — | Initiate Google OAuth login |
| GET | `/google/callback` | ❌ | — | Handle Google OAuth callback, generate JWT, redirect to dashboard |

---

### TMDB Routes (`/api/tmdb`)

| Method | Route | Protected | Query / Params | Description |
|-------|-------|----------|----------------|------------|
| GET | `/search?query=<query>` | ❌ | `query` | Search TMDB movies |
| GET | `/details/:tmdbId` | ❌ | `tmdbId` | Get TMDB movie details by ID |

---

### Movie Routes (`/api/movies`)

| Method | Route | Protected | Body / Params | Description |
|-------|-------|----------|---------------|------------|
| POST | `/` | ✅ | `{ tmdbId, title, overview, posterPath, releaseDate }` | Add a movie |
| DELETE | `/:id` | ✅ | `id = MongoDB _id` | Delete a movie (owner/admin) |
| GET | `/` | ❌ | — | Get all movies |
| GET | `/:id` | ✅ | `id = MongoDB _id` | Get movies added by user (dashboard) |
| POST | `/:id/vote` | ✅ | `id = MongoDB _id` | Upvote a movie (once per user) |
| GET | `/filter/votes` | ❌ | — | Get movies sorted by votes |
| GET | `/:id/votes` | ❌ | `id = MongoDB _id` | Get total votes for a movie |

---

### Comment Routes (`/api/comments`)

| Method | Route | Protected | Body / Params | Description |
|-------|-------|----------|---------------|------------|
| POST | `/` | ✅ | `{ movieId, text }` | Add a comment to a movie |
| GET | `/:movieId` | ❌ | `movieId` | Get all comments for a movie |
| PUT | `/:id` | ✅ | `{ text }` | Update a comment (owner/admin) |
| DELETE | `/:id` | ✅ | `id = MongoDB comment _id` | Delete a comment (owner/admin) |

---

## ⚙️ Installation & Setup

# Clone repository
git clone <repo_url>
cd <project_folder>

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install

# Run backend + frontend locally
npm run dev

## 🚀 Usage

- Signup or login (email/password or Google).  
- Search movies via the home page.  
- Add movies to your collection (login required).  
- Explore all user-added movies and vote on favorites.  
- Comment and engage in discussions.  
- Manage your profile and watchlist from the dashboard.  

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT, Google OAuth  
- **External APIs:** TMDB  

## 🤝 Contributing

1. Fork the repository  
2. Create a branch (`git checkout -b feature-name`)  
3. Make your changes  
4. Commit changes (`git commit -m 'Add feature'`)  
5. Push branch (`git push origin feature-name`)  
6. Open a Pull Request  

## 📄 License

This project is licensed under the MIT License.