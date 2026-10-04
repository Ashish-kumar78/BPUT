# CollegeFlow — College Management System

CollegeFlow is a modern, role-based College Management System designed as a SaaS-style ERP for academic and administrative operations.

## Overview
This project follows the requested architecture and implements the foundation of the system in Phase 1, including:
- modern React + Vite frontend shell
- Express API foundation
- JWT authentication and RBAC
- Prisma schema for a normalized relational design
- dashboard layout and reusable design system
- test coverage for permission logic

## Tech stack
- Frontend: React, TypeScript, Vite, Tailwind CSS, Recharts, Lucide icons
- Backend: Node.js, Express, JWT, Zod
- Database: PostgreSQL + Prisma ORM
- Testing: Vitest

## Project structure
- `src/` — frontend application
- `server/` — backend API
- `prisma/` — database schema
- `docs/` — architecture and planning documents
- `tests/` — unit and integration checks

## Getting started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy `.env.example` to `.env` and adjust secrets and DB settings.

### 3. Run the app
```bash
npm run dev
```
This starts:
- Vite frontend: http://localhost:5173
- Express API: http://localhost:4000

## Phase 1 implemented
- Auth UI with role-based educational login
- Student and admin dashboard shells
- Protected routing and role checks
- RBAC utilities and tests
- Design system with responsive cards and navigation

## Architecture summary
See [docs/architecture.md](docs/architecture.md) for the complete feature matrix, routing model, database schema description, role design, and roadmap.

## Notes
The project intentionally avoids copying the reference visual design. It implements a fresh SaaS dashboard language while matching the required functionality and workflows.

## Production considerations
- Replace demo JWT data with real PostgreSQL persistence
- Configure S3-compatible object storage for document uploads
- Add rate limiting and secure session refresh flow
- Add Prisma migrations and seed scripts
- Introduce tests for API and RBAC workflows

## License
This project is created for educational and demonstration purposes.
