import { render, screen } from "@testing-library/react";
import Card from "./";

describe("Card", () => {
  it("renders correctly", () => {
    render(<Card>Test content</Card>);
    const cardElement = screen.getByText("Test content");
    expect(cardElement).toBeInTheDocument();
    expect(cardElement.tagName).toBe("MAIN");
  });
});
