import { render, screen } from '@testing-library/react';

import { Button } from '.';

describe('Button', () => {
  it('renders with default props', () => {
    const { asFragment } = render(<Button />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays its content', () => {
    render(<Button>Click Me!</Button>);
    screen.getByText('Click Me!');

    render(
      <Button type='icon'>
        <span data-testid='icon'>Icon Button</span>
      </Button>,
    );
    screen.getByTestId('icon');
  });

  it('injects native button properties', () => {
    render(<Button role='button'>Click me!</Button>);

    screen.getByRole('button');
  });

  it('assigns MUI class names by properties', () => {
    render(<Button variant='contained'>Click me!</Button>);

    const buttonEl = screen.getByText('Click me!');
    expect(buttonEl.className).toMatch(/MuiButton-contained/);
  });
});
