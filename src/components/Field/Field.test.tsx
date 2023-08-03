import { render, screen } from '@testing-library/react';

import Field from '.';

describe('Field', () => {
  const password = '1234567890';
  const setup = () => render(<Field password={password} />);

  it('renders password value correctly', () => {
    setup();
    const fieldElement = screen.getByPlaceholderText('Your Password');
    expect(fieldElement).toHaveValue(password);
  });

  it('displays correct label', () => {
    setup();
    const fieldLabel = screen.getByPlaceholderText('Your Password');
    expect(fieldLabel).toBeInTheDocument();
  });
});
