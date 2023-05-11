import { render, screen, fireEvent } from "@testing-library/react";
import Field from ".";

describe("PasswordDisplay", () => {
  const passwordValue = "1234567890";

  beforeEach(() => {
    render(<Field password={passwordValue} />);
  });

  it("renders with the provided password value", () => {
    expect(getPasswordDisplay().value).toBe(passwordValue);
  });

  it("copies password to clipboard on button click", () => {
    fireEvent.click(getCopyButton());
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(passwordValue);
    expect(getPasswordDisplay).toHaveAttribute("label", "Password copied");
  });
});

const getCopyButton = () => screen.getByRole("button") as HTMLButtonElement;

const getPasswordDisplay = () =>
  screen.getByLabelText("Generated Password") as HTMLInputElement;
