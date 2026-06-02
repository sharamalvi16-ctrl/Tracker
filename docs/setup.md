# Setup Guide

1. Install Node.js 22 and Docker Desktop.
2. Copy `.env.example` to `.env`.
3. Replace every secret in `.env` with long random values.
4. Start PostgreSQL with `docker compose up -d postgres`.
5. Install dependencies with `npm install`.
6. Generate Prisma and migrate with `npm run db:migrate`.
7. Seed demo data with `npm run db:seed`.
8. Start both apps with `npm run dev`.

The frontend runs at `http://localhost:3000`; the API runs at `http://localhost:4000`.
