import { render, screen, fireEvent } from "@testing-library/react";
import Notification from ".";

describe("Notification", () => {
  const text = "Password has been copied to clipboard";

  it("renders with correct message when open is true", () => {
    render(<Notification open={true} onClose={() => {}} />);
    const notificationElement = screen.getByText(text);
    expect(notificationElement).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(<Notification open={false} onClose={() => {}} />);
    const notificationElement = screen.queryByText(text);
    expect(notificationElement).not.toBeInTheDocument();
  });

  it("calls onClose function when button is clicked", () => {
    const onCloseMock = jest.fn();
    render(<Notification open={true} onClose={onCloseMock} />);
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
