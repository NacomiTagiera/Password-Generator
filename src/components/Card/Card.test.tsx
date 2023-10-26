import { render, screen } from '@testing-library/react';

import { Card } from '.';

describe('Card', () => {
  it('renders correctly', () => {
    render(<Card>Test content</Card>);
    const cardEl = screen.getByText('Test content');
    expect(cardEl).toBeInTheDocument();
    expect(cardEl.tagName).toBe('MAIN');
  });
});
