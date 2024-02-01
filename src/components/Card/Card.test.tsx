import { render, screen } from '@testing-library/react';

import { Card } from '.';

describe('Card', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Card>Test</Card>);

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays its children', () => {
    render(<Card>Test</Card>);

    expect(screen.getByText('Test'));
  });
});
