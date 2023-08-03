import { render, screen } from '@testing-library/react';

import Header from '.';

describe('<Header />', () => {
  it('renders header with correct text', () => {
    render(<Header />);
    const headerElement = screen.getByRole('heading');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('Password Generator');
    expect(headerElement.tagName).toBe('H1');
  });
});
