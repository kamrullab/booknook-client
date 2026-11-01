# BookNook - A Small Online Library

BookNook is a responsive community library where readers can discover recent books, contribute titles, borrow available copies, and return them after reading.

**Live website:** https://booknookbd.vercel.app

## Website features

- Email/password registration and login with Better Auth and persistent MongoDB sessions
- Google authentication with intended-route redirects
- Responsive three-slide Swiper banner and six newest database arrivals
- Searchable and category-filtered public book catalog
- Private book details with secure borrowing and real-time copy availability
- Add Book workflow with protected imgbb image uploads
- Owner-only My Books editing and custom deletion confirmation
- My Borrows dashboard with dates and secure book returns
- Duplicate-borrow prevention and atomic available-copy management
- Session-aware navigation, profile dropdown, reader profile, and logout
- Persistent dark/light theme
- Custom loading, error, empty, and 404 states

## Technology

- Next.js 16 App Router and TypeScript
- Better Auth with the official MongoDB adapter
- Better Auth JWT/JWKS plugin for Express authorization
- Tailwind CSS, DaisyUI, custom responsive CSS, Swiper, and Sonner
- MongoDB Atlas, imgbb, Vercel, and Render

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Create `.env.local` with real values. Never commit it.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=generate-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER/booknook
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
IMGBB_API_KEY=
```

Generate a Better Auth secret with a password manager or another cryptographically secure generator. The MongoDB URI should include the `booknook` database name.

## External service setup

### MongoDB Atlas

1. Create a free M0 cluster.
2. Create a database user with a strong password.
3. Add your current IP for local development.
4. Add `0.0.0.0/0` for Vercel and Render, then rely on strong credentials.
5. Copy the driver URI into both projects' environment variables.

### Google authentication

Create a Web OAuth client in Google Cloud and add:

```text
http://localhost:3000/api/auth/callback/google
https://YOUR-VERCEL-DOMAIN/api/auth/callback/google
```

### imgbb

Create an API key at `https://api.imgbb.com/` and store it as `IMGBB_API_KEY`. It is used only by the protected Next.js upload route and is never exposed through a `NEXT_PUBLIC_` variable.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
```

## Deployment order

1. Deploy `booknook-server` to Render using its `render.yaml`.
2. Deploy this repository to Vercel.
3. Set Vercel `NEXT_PUBLIC_API_URL` to the Render service URL.
4. Set Render `CLIENT_URL`, `AUTH_ISSUER`, and `AUTH_AUDIENCE` to the Vercel origin.
5. Set Render `AUTH_JWKS_URL` to `https://YOUR-VERCEL-DOMAIN/api/auth/jwks`.
6. Redeploy both services after environment variables are saved.
7. Add the final Vercel URL to the **Live website** line above.

## Production acceptance checks

- Register, log in, Google sign in, and log out
- Refresh every private route without losing the session
- Add, edit, and delete an owned book
- Borrow, duplicate-borrow rejection, zero-copy behavior, and return
- Direct URL loading for every route
- Mobile navigation, dialogs, forms, and tables
- CORS communication between the Vercel client and Render server
