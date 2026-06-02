# Database Documentation

TaskFlow uses PostgreSQL with Prisma ORM.

- `User` owns boards, stores hashed passwords, receives assignments, and owns refresh tokens.
- `Board` belongs to one user and contains ordered columns.
- `Column` belongs to one board and contains ordered tasks.
- `Task` belongs to one column, can be assigned to one user, includes priority, status, due dates, labels, and ordering.
- `RefreshToken` stores SHA-256 token hashes for revocation and rotation.
- `Comment` and `Activity` provide collaboration and audit-history extension points.

Indexes cover ownership lookups, task ordering, status filtering, priority filtering, due-date views, and title searches.
