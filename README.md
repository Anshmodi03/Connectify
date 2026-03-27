# Connectify

A full-stack social media platform built with the MERN stack. Users can create accounts, share posts with images, like and comment on posts, and manage friend connections.

**Live Demo**: [connectify-social-azure.vercel.app](https://connectify-social-azure.vercel.app)

**Backend API**: [connectify-backend-d3lg.onrender.com](https://connectify-backend-d3lg.onrender.com)

---

## Tech Stack

**Frontend**
- React 18 + Vite
- Redux Toolkit (state management)
- MUI v5 (dark theme)
- React Router v7
- Formik + Yup (form validation)
- GSAP (animations)
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Multer (file uploads)
- bcryptjs, Helmet, express-rate-limit

---

## Project Structure

```
├── backend/               # Express REST API
│   ├── config/db.js       # MongoDB connection
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth, error, validation
│   ├── models/            # Mongoose schemas (User, Post, Comment, Like)
│   ├── routes/            # API route definitions
│   ├── uploads/           # Served as /assets/:filename
│   ├── index.js           # Entry point
│   └── seed.js            # Demo data seeder
└── frontend/              # React + Vite SPA
    ├── src/
    │   ├── api/api.js      # Axios client + all API calls
    │   ├── components/     # Reusable UI components
    │   ├── scenes/         # Pages and widgets
    │   ├── state/          # Redux store + actions
    │   └── theme.js        # MUI dark theme tokens
    └── vercel.json         # SPA rewrite rule
```

---

## Getting Started

### Prerequisites

- Node.js v16+
- MongoDB Atlas account (or local MongoDB)

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:
```
PORT=8000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
JWT_SECRET=your_secret_here
```

```bash
node index.js        # starts on :8000
node seed.js         # optional: seed demo users, posts, images
```

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```
VITE_API_BASE_URL=http://localhost:8000
```

```bash
npm run dev          # dev server → http://localhost:5173
npm run build        # production build
```

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | No | Register (multipart/form-data) |
| POST | `/api/auth/login` | No | Login → `{ token, user }` |
| GET | `/api/health` | No | Health check |
| GET | `/api/posts` | Yes | Feed (paginated `?page&limit`) |
| POST | `/api/posts` | Yes | Create post |
| GET | `/api/posts/:userId/posts` | Yes | User's posts |
| PATCH | `/api/posts/:id/like` | Yes | Toggle like |
| POST | `/api/posts/comment/:id` | Yes | Add comment |
| DELETE | `/api/posts/:id` | Yes | Delete own post |
| GET | `/api/users/:id` | Yes | Get user |
| PUT | `/api/users/:id` | Yes | Update profile |
| GET | `/api/users/:id/friends` | Yes | Get friends |
| PATCH | `/api/users/:id/:friendId` | Yes | Add/remove friend |

---

## Seed Data

Run `node seed.js` from the `backend/` directory to populate the database with:

- 5 demo users (Alex, Maria, James, Emma, Raj)
- 10 posts with images, likes, and comments
- 6 friend connections

**Login credentials** (all users): `password123`

| Email | Name |
|-------|------|
| alex@example.com | Alex Johnson |
| maria@example.com | Maria Garcia |
| james@example.com | James Chen |
| emma@example.com | Emma Wilson |
| raj@example.com | Raj Patel |

---

## Deployment

| Service | Purpose |
|---------|---------|
| [Vercel](https://vercel.com) | Frontend hosting |
| [Render](https://render.com) | Backend hosting |
| [UptimeRobot](https://uptimerobot.com) | Keeps Render free tier alive (pings `/api/health` every 5 min) |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Database |
