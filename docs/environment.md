# Environment Variables

- `DATABASE_URL`: PostgreSQL connection string used by Prisma.
- `API_PORT`: Express server port.
- `NEXT_PUBLIC_API_URL`: browser-visible API base URL.
- `JWT_ACCESS_SECRET`: secret for short-lived access tokens.
- `JWT_REFRESH_SECRET`: secret for refresh tokens.
- `JWT_ACCESS_EXPIRES_IN`: access token lifetime.
- `JWT_REFRESH_EXPIRES_IN`: refresh token lifetime.
- `COOKIE_SECRET`: signing secret for cookies.
- `CSRF_SECRET`: reserved for CSRF integrations.
- `CORS_ORIGIN`: frontend origin allowed to call the API with credentials.
