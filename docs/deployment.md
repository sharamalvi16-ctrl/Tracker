# Deployment Guide

## Frontend on Vercel

1. Create a Vercel project from this repository.
2. Set the root directory to `apps/web`.
3. Add `NEXT_PUBLIC_API_URL=https://your-api-host/api`.
4. Deploy with the default Next.js build command.

## Backend on Railway or Render

1. Create a Node.js service from the repository root.
2. Set build command: `npm install && npm run prisma:generate --workspace @taskflow/api && npm run build --workspace @taskflow/api`.
3. Set start command: `npm run start --workspace @taskflow/api`.
4. Add all API environment variables.
5. Run `npm run db:migrate` after provisioning PostgreSQL.

## PostgreSQL

Use a managed PostgreSQL 16 database. Require TLS in production and rotate secrets before launch.
