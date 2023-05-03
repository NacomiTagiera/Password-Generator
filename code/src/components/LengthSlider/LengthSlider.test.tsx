import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LengthSlider from "./";

describe("LengthSlider", () => {
  const onSliderChange = jest.fn();
  const onInputChange = jest.fn();
  const onBlur = jest.fn();
  const value = 10;

  it("renders the component with default props", () => {
    render(
      <LengthSlider
        value={value}
        onSliderChange={onSliderChange}
        onInputChange={onInputChange}
        onBlur={onBlur}
      />
    );

    expect(screen.getByText("Password length")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByDisplayValue(value.toString())).toBeInTheDocument();
  });

  it("triggers the onSliderChange when the slider is moved", () => {
    render(
      <LengthSlider
        value={value}
        onSliderChange={onSliderChange}
        onInputChange={onInputChange}
        onBlur={onBlur}
      />
    );

    const slider = screen.getByRole("slider");
    userEvent.click(slider, { clientX: 100 });

    expect(onSliderChange).toHaveBeenCalled();
  });

  it("triggers the onInputChange when the input value is changed", () => {
    render(
      <LengthSlider
        value={value}
        onSliderChange={onSliderChange}
        onInputChange={onInputChange}
        onBlur={onBlur}
      />
    );

    const input = screen.getByRole("spinbutton");
    userEvent.type(input, "15");

    expect(onInputChange).toHaveBeenCalled();
  });

  it("triggers the onBlur when the input is blurred", () => {
    render(
      <LengthSlider
        value={value}
        onSliderChange={onSliderChange}
        onInputChange={onInputChange}
        onBlur={onBlur}
      />
    );

    const input = screen.getByRole("spinbutton");
    userEvent.tab(input);

    expect(onBlur).toHaveBeenCalled();
  });
});
