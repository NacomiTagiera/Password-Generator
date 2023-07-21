import { render, screen } from '@testing-library/react';

import Field from '.';

describe('Field', () => {
  const password = '1234567890';

  beforeEach(() => {
    render(<Field password={password} />);
  });

  it('renders password value correctly', () => {
    const fieldElement = screen.getByPlaceholderText('Your Password');
    expect(fieldElement).toHaveValue(password);
  });

  it('displays correct label', () => {
    const fieldLabel = screen.getByPlaceholderText('Your Password');
    expect(fieldLabel).toBeInTheDocument();
  });
});
