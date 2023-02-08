import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { defaultPasswordLength } from "../../hooks/usePasswordGenerator";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("renders correctly", () => {
    expect(getHeader()).toBeInTheDocument();

    expect(getPwInput()).toBeInTheDocument();

    expect(getCopyBtn()).toBeInTheDocument();

    expect(getSlider()).toBeInTheDocument();

    expect(getCheckboxes()).toHaveLength(4);

    expect(getGenerateBtn()).toBeInTheDocument();
  });

  test("renders correctly initial state", () => {
    expect(getPwInput()).toHaveValue("");

    expect(getCopyBtn()).toBeDisabled();

    expect(getSlider()).toHaveValue(`${defaultPasswordLength}`);

    getCheckboxes().forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  test("elements are focused in the right order", async () => {
    const user = userEvent.setup();

    const elements = [
      getPwInput(),
      getSlider(),
      ...getCheckboxes(),
      getGenerateBtn(),
    ];

    elements.forEach(async (element) => {
      await user.tab();
      await waitFor(() => {
        expect(element).toHaveFocus();
      });
    });
  });

  test("toggling checkboxes and modifying slider value work properly", () => {
    const user = userEvent.setup();

    const newLength = 10;

    getCheckboxes().forEach(async (checkbox) => {
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
    fireEvent.change(getSlider(), { target: { value: newLength } });
    expect(getSlider()).toHaveValue(newLength.toString());
  });

  test("generate password button is disabled when no options are checked", async () => {
    const user = userEvent.setup();

    expect(getGenerateBtn()).not.toBeDisabled();

    getCheckboxes().forEach(async (checkbox) => {
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    await waitFor(() => {
      expect(getGenerateBtn()).toBeDisabled();
    });
  });

  test("displays generated password", async () => {
    const user = userEvent.setup();
    const defaultRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.])\\S{" +
        defaultPasswordLength +
        "}$"
    );

    await user.click(getGenerateBtn());
    expect(getPwInput()).toHaveDisplayValue(defaultRegex);
  });

  test("copies generated password to clipboard when copy button is clicked", async () => {
    const user = userEvent.setup();
    jest.spyOn(navigator.clipboard, "writeText");

    await user.click(getGenerateBtn());
    await user.click(getCopyBtn());
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });

  test("MUI Alert is rendered after the user copies the password", async () => {
    const user = userEvent.setup();

    await user.click(getGenerateBtn());
    await user.click(getCopyBtn());

    const alert = await screen.findByText(/success!/i);
    await waitFor(() => {
      expect(alert).toBeInTheDocument();
    });
  });
});

const getCheckboxes = () => screen.getAllByRole("checkbox");
const getCopyBtn = () => screen.getByTitle(/copy/i);
const getGenerateBtn = () => screen.getByRole("button", { name: /generate/i });
const getHeader = () =>
  screen.getByRole("heading", { name: /password generator/i });
const getPwInput = () => screen.getByPlaceholderText(/password.../i);
const getSlider = () => screen.getByRole("slider");
