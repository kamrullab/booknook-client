# BookNook Client

> A warm, community-powered online library where readers share books, discover new stories, and manage borrowing from one responsive interface.

[![Live Website](https://img.shields.io/badge/Live-booknookbd.vercel.app-EA7A4B?style=for-the-badge)](https://booknookbd.vercel.app)
[![API](https://img.shields.io/badge/API-Render-18332B?style=for-the-badge)](https://booknook-server-xlsi.onrender.com)

## Overview

BookNook is the frontend and authentication application for a small online library. Visitors can explore the public collection, while authenticated readers can add their own books, borrow available copies, return books, manage their contributions, and update their profile.

The interface includes custom light and dark themes, responsive layouts for phones through large desktops, accessible menus and dialogs, SEO metadata, social sharing imagery, and graceful loading, empty, and error states.

## Key features

- Email/password and Google authentication with persistent sessions
- Session-aware navigation and protected application routes
- Responsive home page with an illustrated three-slide hero
- Latest-arrivals section backed by live database content
- Searchable and category-filtered book catalog
- Individual book pages with availability and owner information
- Protected book creation with secure image upload through imgbb
- Owner-only book editing and deletion
- Borrowing with confirmation, duplicate prevention, and live copy counts
- Personal borrow shelf with return dates and return actions
- Editable reader profile with display name and profile photo
- Persistent light/dark appearance preference
- Dynamic book titles, canonical metadata, Open Graph image, favicon, and manifest

## Technology stack

- **Framework:** Next.js 16 App Router, React, and TypeScript
- **Authentication:** Better Auth, Google OAuth, and JWT/JWKS
- **Database:** MongoDB Atlas with the Better Auth MongoDB adapter
- **Interface:** Tailwind CSS, DaisyUI, custom CSS, and Swiper
- **Feedback:** Sonner toast notifications
- **Images:** Protected imgbb upload route
- **Deployment:** Vercel frontend and Render API

## Application routes

### Public and guest routes

- **`/`** — Home, featured slides, newest books, and borrowing guide
- **`/books`** — Search and filter the complete catalog
- **`/login`** — Email/password and Google sign-in
- **`/register`** — Create a reader account

### Signed-in routes

- **`/books/[id]`** — View details and borrow an available book
- **`/add-book`** — Add a new book to the shelf
- **`/my-books`** — Edit or remove books owned by the current reader
- **`/my-borrows`** — Review and return active borrowed books
- **`/profile`** — View and edit the current reader profile

Authenticated visitors who open `/login` or `/register` are redirected to their profile.

## Local development

### Prerequisites

- Node.js 22 or newer
- npm
- A MongoDB database
- A running BookNook API
- Google OAuth credentials for Google sign-in (optional locally)
- An imgbb API key for image uploads

### Installation

```bash
git clone https://github.com/kamrullab/booknook-client.git
cd booknook-client
npm install
```

Copy the environment template:

```bash
cp .env.example .env.local
```

Configure `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/booknook
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
IMGBB_API_KEY=
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Google OAuth configuration

Create a Web OAuth client in Google Cloud and register these callback URLs:

```text
http://localhost:3000/api/auth/callback/google
https://booknookbd.vercel.app/api/auth/callback/google
```

Add the client ID and secret to the matching local and Vercel environment variables.

## Available commands

- **`npm run dev`** — Start the Next.js development server
- **`npm run build`** — Create an optimized production build
- **`npm run start`** — Run the production build locally
- **`npm run lint`** — Check the code with ESLint
- **`npm run typecheck`** — Validate TypeScript without emitting files

Recommended verification before deployment:

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

1. Deploy the API first and verify its health endpoint.
2. Import this repository into Vercel.
3. Add every variable from `.env.example` using production values.
4. Set `NEXT_PUBLIC_API_URL` to `https://booknook-server-xlsi.onrender.com`.
5. Set `BETTER_AUTH_URL` to `https://booknookbd.vercel.app`.
6. Add the production Google callback URL and redeploy.

## Related project

- [BookNook Server](https://github.com/kamrullab/booknook-server) — Express API, authorization, book inventory, and borrow lifecycle

## Production links

- Website: [https://booknookbd.vercel.app](https://booknookbd.vercel.app)
- API: [https://booknook-server-xlsi.onrender.com](https://booknook-server-xlsi.onrender.com)

---

Built for readers who believe a good shelf becomes better when it is shared.
