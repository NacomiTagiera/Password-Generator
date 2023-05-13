import { render, screen, fireEvent } from "@testing-library/react";
import GenerateButton from ".";

describe("GenerateButton", () => {
  it("renders correctly", () => {
    render(<GenerateButton onClick={() => {}} />);
    expect(getButton()).toBeInTheDocument();
  });

  it("should call the onClick handler when the button is clicked", () => {
    const handleClick = jest.fn();
    render(<GenerateButton onClick={handleClick} />);
    fireEvent.click(getButton());
    expect(handleClick).toHaveBeenCalled();
  });
});

const getButton = () => screen.getByText("Generate");
