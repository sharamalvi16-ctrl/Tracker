import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BoardsView } from "./boards-view";

describe("BoardsView", () => {
  it("renders boards heading", () => {
    render(<BoardsView />);
    expect(screen.getByRole("heading", { name: "Boards" })).toBeInTheDocument();
  });
});
