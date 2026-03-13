# PRaww Reads

A literary community platform for readers and writers. Features include story sharing with chapter support, social interactions (likes, comments, follows), a book marketplace for buying/selling/swapping physical books, and user profiles.

## Architecture

**Full-stack application:**
- **Frontend**: React (Create React App + CRACO), Tailwind CSS, shadcn/ui components
- **Backend**: FastAPI (Python), MongoDB (via Motor async driver)
- **Auth**: JWT tokens stored in localStorage

## Project Structure

```
backend/       - FastAPI server (server.py) with all API routes
frontend/      - React application
  src/pages/   - Page components (Home, Marketplace, Write, StoryDetail, Profile, etc.)
  src/components/ - Reusable UI components
  src/hooks/   - AuthContext, use-toast
  src/lib/     - API utilities (api.js)
memory/        - PRD.md and CHANGELOG.md
```

## Workflows

- **Backend API**: `cd backend && uvicorn server:app --host 0.0.0.0 --port 8000 --reload` (port 8000, console)
- **Start application**: Serves static frontend build via `serve` on port 5000 (webview)

> Note: The frontend is served as a production build (not dev server) because the webpack build is too slow to start within the workflow timeout. After frontend code changes, run `cd frontend && CI=false npm run build` then restart the "Start application" workflow.

## Environment

- **Backend**: `backend/.env` contains `MONGO_URL`, `DB_NAME`, `JWT_SECRET`
- **Frontend**: `frontend/.env` contains `REACT_APP_BACKEND_URL` pointing to the local backend

## Key Files

- `backend/server.py` - All API routes and business logic
- `frontend/src/lib/api.js` - API base URL and fetch utility
- `frontend/src/hooks/AuthContext.js` - Auth state management

## Database (MongoDB Atlas)

Collections: `users`, `stories`, `chapters`, `story_likes`, `story_favorites`, `story_progress`, `story_comments`, `comment_likes`, `books`, `messages`, `follows`, `book_favorites`
