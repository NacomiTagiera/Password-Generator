import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  test("elements are focused in the right order", async () => {
    const user = userEvent.setup();
    render(<App />);

    const checkboxes = screen.getAllByRole("checkbox");
    const generatePasswordButton = screen.getByRole("button", {
      name: /generate/i,
    });
    const passwordInput = screen.getByPlaceholderText(/password.../i);
    const slider = screen.getByRole("slider");

    await user.tab();
    expect(passwordInput).toHaveFocus();

    await user.tab();
    expect(slider).toHaveFocus();

    checkboxes.forEach(async (checkbox) => {
      await user.tab();
      await waitFor(() => {
        expect(checkbox).toHaveFocus();
      });
    });

    await user.tab();
    expect(generatePasswordButton).toHaveFocus();
  });

  test("toggling checkboxes and modifying slider value work properly", () => {
    const user = userEvent.setup();
    render(<App />);

    const checkboxes = screen.getAllByRole("checkbox");
    const slider = screen.getByRole("slider");
    const newLength = 10;

    checkboxes.forEach(async (checkbox) => {
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
    fireEvent.change(slider, { target: { value: newLength } });
    expect(slider).toHaveValue(newLength.toString());
  });

  test("generate password button is disabled when no options are checked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const checkboxes = screen.getAllByRole("checkbox");
    const generatePasswordButton = screen.getByRole("button", {
      name: /generate/i,
    });
    expect(generatePasswordButton).not.toBeDisabled();

    checkboxes.forEach(async (checkbox) => {
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    await waitFor(() => {
      expect(generatePasswordButton).toBeDisabled();
    });
  });

  test("displays generated password", async () => {
    const user = userEvent.setup();
    render(<App />);

    const generatePasswordButton = screen.getByRole("button", {
      name: /generate/i,
    });
    const passwordInput = screen.getByPlaceholderText(/password.../i);
    expect(passwordInput).toHaveValue("");

    const defaultRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.])\\S{" +
        defaultPasswordLength +
        "}$"
    );
    await user.click(generatePasswordButton);
    expect(passwordInput).toHaveDisplayValue(defaultRegex);
  });

  test("copies generated password to clipboard when copy button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);
    jest.spyOn(navigator.clipboard, "writeText");

    const copyButton = screen.getByTitle(/copy/i);
    const generatePasswordButton = screen.getByRole("button", {
      name: /generate/i,
    });

    await user.click(generatePasswordButton);
    await user.click(copyButton);
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });

  test("MUI Alert is rendered after the user copies the password", async () => {
    const user = userEvent.setup();
    render(<App />);

    const copyButton = screen.getByTitle(/copy/i);
    const generatePasswordButton = screen.getByRole("button", {
      name: /generate/i,
    });

    await user.click(generatePasswordButton);
    await user.click(copyButton);

    const alert = await screen.findByText(/success!/i);
    await waitFor(() => {
      expect(alert).toBeInTheDocument();
    });
  });
});
