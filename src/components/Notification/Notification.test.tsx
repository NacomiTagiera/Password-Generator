import { fireEvent, render, screen } from '@testing-library/react';

import { Notification } from '.';

describe('Notification', () => {
  const text = 'Password has been copied';
  const getNotificationEl = () => screen.queryByText(text);

  it('renders with correct message when open is true', () => {
    render(<Notification open onClose={() => {}} />);
    expect(getNotificationEl()).toBeInTheDocument();
  });

  it('does not render when open prop is not passed', () => {
    render(<Notification onClose={() => {}} />);
    expect(getNotificationEl()).not.toBeInTheDocument();
  });

  it('calls onClose function when button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<Notification open onClose={onCloseMock} />);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
