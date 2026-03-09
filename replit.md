# PRaww Reads

A literary community platform for discovering stories, sharing books, and connecting with readers.

## Architecture

- **Frontend**: React (Create React App + CRACO), Tailwind CSS, Radix UI components, React Router
  - Port: 5000 (dev), served via `PORT=5000 npm start` in `frontend/`
- **Backend**: FastAPI (Python), MongoDB via Motor async driver
  - Port: 8000, served via `uvicorn server:app --host localhost --port 8000` in `backend/`

## Key Files

- `frontend/src/App.js` — Main React router and layout
- `frontend/craco.config.js` — CRACO config with dev server (host: 0.0.0.0, port: 5000, allowedHosts: all)
- `backend/server.py` — FastAPI app with all API routes
- `backend/requirements.txt` — Python dependencies
- `frontend/package.json` — Node dependencies (use npm with --legacy-peer-deps)

## Environment Variables / Secrets

- `MONGO_URL` — MongoDB connection string (Replit Secret)
- `DB_NAME` — MongoDB database name (`prawwreads`, in `backend/.env`)
- `JWT_SECRET` — JWT signing key (in `backend/.env`)
- `REACT_APP_BACKEND_URL` — Backend URL for frontend API calls (in `frontend/.env`)

## Features

- User authentication (register/login/logout) with JWT
- Story creation, reading, liking, commenting
- Book marketplace (buy/sell/swap)
- Messaging between users
- User profiles with follow/unfollow
- Favorites for stories and books

## Development Notes

- Frontend uses npm (not yarn) with `--legacy-peer-deps` flag due to peer dep conflicts
- Backend CORS is dynamically configured to allow the Replit dev domain
- `ajv` and `ajv-keywords` are pinned to v8/v5 for Node 20 compatibility
