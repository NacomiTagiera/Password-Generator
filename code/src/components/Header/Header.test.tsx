import { render, screen } from "@testing-library/react";
import Header from ".";

describe("<Header />", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("renders header with correct text", () => {
    const headerElement = screen.getByRole("heading");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent("Password Generator");
    expect(headerElement.tagName).toBe("H1");
  });
});
