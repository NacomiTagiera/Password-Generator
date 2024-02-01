import { render, screen } from '@testing-library/react';

import { Field } from '.';

describe('Field', () => {
  const password = '123';

  it('renders correctly', () => {
    const { asFragment } = render(<Field password={password} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the correct password', () => {
    render(<Field password={password} />);

    screen.getByDisplayValue(password);
  });

  it('is read-only', () => {
    render(<Field password={password} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });
});
