import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "../App";
import { defaultPasswordLength } from "../hooks/usePasswordGenerator";

describe("App", () => {
  test("renders correctly", () => {
    render(<App />);

    const header = screen.getByRole("heading", { name: /password generator/i });
    expect(header).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText(/password.../i);
    expect(passwordInput).toBeInTheDocument();

    const copyButton = screen.getByTitle(/copy/i);
    expect(copyButton).toBeInTheDocument();

    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(4);

    const generatePasswordButton = screen.getByRole("button", {
      name: /generate/i,
    });
    expect(generatePasswordButton).toBeInTheDocument();
  });

  test("renders correctly initial state", () => {
    render(<App />);

    const passwordInput = screen.getByPlaceholderText(/password.../i);
    expect(passwordInput).toHaveValue("");

    const copyButton = screen.getByTitle(/copy/i);
    expect(copyButton).toBeDisabled();

    const slider = screen.getByRole("slider");
    expect(slider).toHaveValue(`${defaultPasswordLength}`);

    const digitsCheckbox = screen.getByLabelText(/digits/i);
    expect(digitsCheckbox).toBeChecked();

    const lowercaseCheckbox = screen.getByLabelText(/lowercase/i);
    expect(lowercaseCheckbox).toBeChecked();

    const symbolsCheckbox = screen.getByLabelText(/symbols/i);
    expect(symbolsCheckbox).toBeChecked();

    const uppercaseCheckbox = screen.getByLabelText(/uppercase/i);
    expect(uppercaseCheckbox).toBeChecked();
  });

  test("elements are focused in the right order", () => {
    render(<App />);

    const digitsCheckbox = screen.getByLabelText(/digits/i);
    const lowercaseCheckbox = screen.getByLabelText(/lowercase/i);
    const symbolsCheckbox = screen.getByLabelText(/symbols/i);
    const uppercaseCheckbox = screen.getByLabelText(/uppercase/i);
    const generatePasswordButton = screen.getByRole("button", {
      name: "Generate",
    });
    const passwordInput = screen.getByPlaceholderText(/password.../i);
    const slider = screen.getByRole("slider");

    user.tab();
    expect(passwordInput).toHaveFocus();

    user.tab();
    expect(slider).toHaveFocus();

    user.tab();
    expect(uppercaseCheckbox).toHaveFocus();

    user.tab();
    expect(lowercaseCheckbox).toHaveFocus();

    user.tab();
    expect(digitsCheckbox).toHaveFocus();

    user.tab();
    expect(symbolsCheckbox).toHaveFocus();

    user.tab();
    expect(generatePasswordButton).toHaveFocus();
  });
});
