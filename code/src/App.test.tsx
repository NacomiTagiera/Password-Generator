import { render, screen } from "@testing-library/react";
import App from "./App";
import user from "@testing-library/user-event";

describe("App", () => {
  test("renders correctly", () => {
    render(<App />);
    const header = screen.getByRole("heading");
    expect(header).toBeInTheDocument();
    const generatePasswordButton = screen.getByRole("button", {
      name: "Generate password",
    });
    expect(generatePasswordButton).toBeInTheDocument();
  });
});
