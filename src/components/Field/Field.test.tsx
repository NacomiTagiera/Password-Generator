import { render, screen } from '@testing-library/react';

import { Field } from '.';

describe('Field', () => {
  const password = '1234567890';
  const getFieldEl = () => screen.getByPlaceholderText('Your Password');

  it('renders password value correctly', () => {
    render(<Field password={password} />);
    expect(getFieldEl()).toHaveValue(password);
  });

  it('displays correct label', () => {
    render(<Field password={password} />);
    expect(getFieldEl()).toBeInTheDocument();
  });
});
