import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "../App";
import { defaultPasswordLength } from "../../hooks/usePasswordGenerator";

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

    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  test("elements are focused in the right order", () => {
    render(<App />);

    const checkboxes = screen.getAllByRole("checkbox");
    const generatePasswordButton = screen.getByRole("button", {
      name: "Generate",
    });
    const passwordInput = screen.getByPlaceholderText(/password.../i);
    const slider = screen.getByRole("slider");

    user.tab();
    expect(passwordInput).toHaveFocus();

    user.tab();
    expect(slider).toHaveFocus();

    checkboxes.forEach((checkbox) => {
      user.tab();
      expect(checkbox).toBeChecked();
    });

    user.tab();
    expect(generatePasswordButton).toHaveFocus();
  });

  test("generate password button is disabled when no options are checked", () => {
    render(<App />);

    const checkboxes = screen.getAllByRole("checkbox");
    const generatePasswordButton = screen.getByRole("button", {
      name: "Generate",
    });

    checkboxes.forEach((checkbox) => {
      user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    expect(generatePasswordButton).toBeDisabled();
  });

  test("displays generated password", async () => {
    render(<App />);

    const generatePasswordButton = screen.getByRole("button", {
      name: "Generate",
    });
    const passwordInput = screen.getByPlaceholderText(/password.../i);

    expect(passwordInput).toHaveValue("");
    user.click(generatePasswordButton);
    const defaultRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.])\\S{" +
        defaultPasswordLength +
        "}$"
    );
    expect(passwordInput).toHaveDisplayValue(defaultRegex);
  });
});
