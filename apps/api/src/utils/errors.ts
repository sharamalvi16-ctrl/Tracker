export class AppError extends Error { constructor(public statusCode: number, message: string, public code = "APP_ERROR") { super(message); } }
export const notFound = (resource = "Resource") => new AppError(404, `${resource} not found`, "NOT_FOUND");
