import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Notification } from '.';

describe('Notification', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <Notification open onClose={() => {}}>
        Test
      </Notification>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays its children', () => {
    render(
      <Notification open onClose={() => {}}>
        Test
      </Notification>,
    );

    screen.getByText('Test');
  });

  it('is hidden initially', () => {
    render(<Notification onClose={() => {}}>Test</Notification>);

    expect(screen.queryByTestId('notification')).not.toBeInTheDocument();
  });

  it('invokes the onClose function when the close button is clicked', async () => {
    const handleClose = jest.fn();

    render(
      <Notification open onClose={handleClose}>
        Test
      </Notification>,
    );

    await userEvent.click(screen.getByRole('button'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
