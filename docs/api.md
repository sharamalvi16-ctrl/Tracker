# API Documentation

Protected routes require an access token through the signed `accessToken` HttpOnly cookie or `Authorization: Bearer <token>`.

## Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`
- `GET /api/auth/me`

## Boards

- `GET /api/boards?search=`
- `GET /api/boards/:id`
- `POST /api/boards`
- `PUT /api/boards/:id`
- `DELETE /api/boards/:id`

## Columns

- `POST /api/columns`
- `PUT /api/columns/:id`
- `DELETE /api/columns/:id`

## Tasks

- `GET /api/tasks?q=&priority=&status=`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `PATCH /api/tasks/:id/move`
- `DELETE /api/tasks/:id`
