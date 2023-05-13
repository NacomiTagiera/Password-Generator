import { render, screen, fireEvent } from "@testing-library/react";
import CopyButton from ".";

describe("CopyButton", () => {
  test("renders correctly", () => {
    render(<CopyButton onClick={() => {}} />);
    expect(getCopyButton()).toBeInTheDocument();
  });

  test("calls onClick function when clicked", () => {
    const onClickMock = jest.fn();
    render(<CopyButton onClick={onClickMock} />);
    fireEvent.click(getCopyButton());
    expect(onClickMock).toHaveBeenCalled();
  });
});

const getCopyButton = () => screen.getByLabelText("Copy password");
