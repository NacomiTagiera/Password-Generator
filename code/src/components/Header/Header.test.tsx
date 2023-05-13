import { render, screen } from "@testing-library/react";
import Header from ".";

test("renders header with correct text", () => {
  render(<Header />);
  const headerElement = screen.getByRole("heading", { level: 1 });
  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toHaveTextContent("Password Generator");
});

test("renders header with correct variant and component", () => {
  render(<Header />);
  const headerElement = screen.getByRole("heading", { level: 1 });
  expect(headerElement).toHaveAttribute("variant", "h3");
  expect(headerElement).toHaveAttribute("component", "h1");
});

test("renders header with centered alignment", () => {
  render(<Header />);
  const headerElement = screen.getByRole("heading", { level: 1 });
  expect(headerElement).toHaveStyle({ textAlign: "center" });
});
