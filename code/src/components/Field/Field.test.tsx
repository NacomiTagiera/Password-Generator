import { render, screen } from "@testing-library/react";
import Field from ".";

describe("Field", () => {
  const label = "Your password";
  const password = "1234567890";

  beforeEach(() => {
    render(<Field password={password} />);
  });

  test("renders password value correctly", () => {
    const fieldElement = screen.getByLabelText(label);
    expect(fieldElement).toHaveValue(password);
  });

  test("displays correct label", () => {
    const fieldLabel = screen.getByText(label);
    expect(fieldLabel).toBeInTheDocument();
  });
});
