import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LengthSlider from ".";

describe("LengthSlider", () => {
  const onSliderChange = jest.fn();
  const onInputChange = jest.fn();
  const onBlur = jest.fn();
  const value = 10;

  it("renders the component correctly", () => {
    render(
      <LengthSlider
        value={value}
        onSliderChange={onSliderChange}
        onInputChange={onInputChange}
        onBlur={onBlur}
      />
    );

    expect(screen.getByText("Password length")).toBeInTheDocument();
    expect(getSlider()).toBeInTheDocument();
    expect(getInput()).toBeInTheDocument();
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

    fireEvent.change(getSlider(), { target: { value: 20 } });
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

    userEvent.type(getInput(), "15");
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

    userEvent.tab();
    expect(onBlur).toHaveBeenCalled();
  });
});

const getSlider = () => screen.getByRole("slider");
const getInput = () => screen.getByRole("input");
