import { render, screen, fireEvent } from "@testing-library/react";
import MyButton from "./";
import { AddCircle } from "@mui/icons-material";

describe("MyButton component", () => {
  it("should render correctly", () => {
    const onClick = jest.fn();
    render(<MyButton icon={<AddCircle />} label="Add" onClick={onClick} />);
    const buttonElement = screen.getByLabelText("Add");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should render with the text", () => {
    const onClick = jest.fn();
    render(
      <MyButton
        icon={<AddCircle />}
        label="Add"
        text="Add Item"
        onClick={onClick}
      />
    );
    const buttonElement = screen.getByText("Add Item");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const onClick = jest.fn();
    render(<MyButton icon={<AddCircle />} label="Add" onClick={onClick} />);
    const buttonElement = screen.getByLabelText("Add");
    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalled();
  });
});
