import { render, screen } from '@testing-library/react';

import { Header } from '.';

describe('<Header />', () => {
  it('renders header with correct text', () => {
    render(<Header />);
    const headerEl = screen.getByRole('heading');
    expect(headerEl).toBeInTheDocument();
    expect(headerEl).toHaveTextContent('Password Generator');
    expect(headerEl.tagName).toBe('H1');
  });
});
