# Prisma Company Application Portal

A full-stack job application portal for **Prisma Company** with two user roles: **HR** and **Applicant**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite + Tailwind CSS v4 |
| Backend | Node.js + Express |
| ORM | Prisma |
| Database | PostgreSQL 16 |
| Auth | JWT + bcryptjs |
| Container | Docker / docker-compose |

## Project Structure

```
jobapplication/
├── backend/                 # Express API server
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.js          # Demo data seeder
│   ├── src/
│   │   ├── index.js         # Entry point
│   │   ├── middleware/
│   │   │   └── auth.js      # JWT middleware
│   │   └── routes/
│   │       ├── auth.js      # Login / register
│   │       ├── jobs.js      # Job postings CRUD
│   │       ├── applications.js  # Applicant application routes
│   │       └── hr.js        # HR management routes
│   └── .env                 # Environment variables
├── frontend/                # React Vite app
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx         # Landing page
│       │   ├── Login.jsx        # Shared login/register
│       │   ├── applicant/       # Applicant pages
│       │   └── hr/              # HR pages
│       └── context/
│           └── AuthContext.jsx  # Auth state
└── docker-compose.yml       # PostgreSQL container
```

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for PostgreSQL)
- npm

### 1. Clone / copy the project

```bash
# If cloned from git:
cd jobapplication

# Install all dependencies
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 2. Start the database

```bash
docker-compose up -d
```

This starts a PostgreSQL 16 instance on `localhost:5432`.

### 3. Configure environment

The backend `.env` file is pre-configured for local development:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/prisma_portal?schema=public"
JWT_SECRET="prisma-company-super-secret-key-change-in-production"
PORT=4000
```

> For production, generate a strong `JWT_SECRET` and update `DATABASE_URL`.

### 4. Run database migrations & seed

```bash
cd backend
npx prisma migrate dev --name init
node prisma/seed.js
```

This creates all tables and inserts demo users + 5 sample job postings.

### 5. Start the backend

```bash
# In the backend/ folder
npm run dev
```

The API will be available at **http://localhost:4000**

### 6. Start the frontend

Open a new terminal:

```bash
# In the frontend/ folder
npm run dev
```

The app will be available at **http://localhost:5173**

---

## Demo Credentials

After seeding the database, you can log in with:

| Role | Email | Password |
|------|-------|----------|
| HR | `hr@prismacompany.com` | `hr@prisma123` |
| Applicant | `john.doe@email.com` | `applicant@123` |

Or register new accounts directly from the login page.

---

## Features

### Applicant Portal
- Browse all active job openings
- Search by title, department, or location
- View full job details
- Apply with a cover letter and resume URL
- Track application status in real time
- Withdraw pending applications

### HR Portal
- Dashboard with hiring analytics (total jobs, applications by status)
- Create, edit, activate/deactivate, and delete job postings
- View all applications with filters by status
- Expand each application to read the cover letter and resume
- Update application status: Pending → Reviewing → Accepted / Rejected

---

## API Endpoints

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### Jobs
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/jobs` | Public | List active jobs |
| GET | `/api/jobs/all` | HR | List all jobs with counts |
| GET | `/api/jobs/:id` | Public | Get single job |
| POST | `/api/jobs` | HR | Create job |
| PUT | `/api/jobs/:id` | HR | Update job |
| DELETE | `/api/jobs/:id` | HR | Delete job |

### Applications
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/applications/my` | Applicant | Get my applications |
| POST | `/api/applications` | Applicant | Submit application |
| DELETE | `/api/applications/:id` | Applicant | Withdraw application |

### HR
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/hr/applications` | HR | All applications (filterable) |
| PATCH | `/api/hr/applications/:id/status` | HR | Update application status |
| GET | `/api/hr/stats` | HR | Dashboard statistics |

---

## Stopping Services

```bash
# Stop the database
docker-compose down

# To also remove all data:
docker-compose down -v
```
