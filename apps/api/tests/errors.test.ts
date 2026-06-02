import { AppError, notFound } from "../src/utils/errors.js";

describe("AppError", () => {
  it("creates typed application errors", () => {
    const error = new AppError(403, "Forbidden", "FORBIDDEN");
    expect(error.statusCode).toBe(403);
    expect(error.code).toBe("FORBIDDEN");
  });

  it("creates not found errors", () => {
    const error = notFound("Board");
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe("Board not found");
  });
});
