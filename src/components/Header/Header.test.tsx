import { render, screen } from '@testing-library/react';

import { Header } from '.';

describe('Header', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Header>Test</Header>);

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays its children', () => {
    render(<Header>Test</Header>);

    screen.getByText('Test');
  });
});
