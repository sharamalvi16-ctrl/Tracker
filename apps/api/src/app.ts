import cookieParser from "cookie-parser";
import cors from "cors";
import csrf from "csurf";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { authRoutes } from "./routes/auth.routes.js";
import { boardRoutes } from "./routes/board.routes.js";
import { columnRoutes } from "./routes/column.routes.js";
import { dashboardRoutes } from "./routes/dashboard.routes.js";
import { taskRoutes } from "./routes/task.routes.js";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));

const csrfProtection = csrf({
  cookie: { httpOnly: true, sameSite: "lax", secure: env.NODE_ENV === "production" },
});

app.get("/health", (_req, res) => res.json({ status: "ok", service: "taskflow-api" }));
app.get("/api/csrf-token", csrfProtection, (req, res) => res.json({ csrfToken: req.csrfToken() }));

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/columns", columnRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorMiddleware);
