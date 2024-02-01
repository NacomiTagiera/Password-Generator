import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { CheckBox } from '.';

describe('CheckBox', () => {
  const label = 'Test Checkbox';

  it('renders with default props', () => {
    const { asFragment } = render(<CheckBox label={label} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays provided label and assigns aria-label', () => {
    render(<CheckBox label={label} />);

    screen.getByText(label);
    screen.getByLabelText(label);
  });

  it('injects native checkbox properties', () => {
    render(<CheckBox label={label} checked />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('invokes onChange function when clicked', async () => {
    const handleChange = jest.fn();
    render(<CheckBox label={label} onChange={handleChange} />);

    await userEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
