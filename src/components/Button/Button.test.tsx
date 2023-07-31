import { fireEvent, render, screen } from '@testing-library/react';

import Button from '.';

describe('Button', () => {
  it('renders correctly with an icon', () => {
    const icon = <span data-testid='icon'>Icon</span>;

    render(<Button variant='icon' icon={icon} onClick={() => {}} />);
    const iconButton = screen.getByTestId('icon');
    expect(iconButton).toBeInTheDocument();
    expect(iconButton).toBeEnabled();
  });

  it('renders correctly with text', () => {
    const label = 'Text Button';

    render(<Button variant='text' label={label} onClick={() => {}} />);
    const textButton = screen.getByRole('button', { name: label });
    expect(textButton).toBeInTheDocument();
    expect(textButton).toBeEnabled();
  });

  it('alls onClick handler when button is clicked', () => {
    const handleClick = jest.fn();
    const label = 'Button';

    render(<Button variant='text' label={label} onClick={handleClick} />);
    const button = screen.getByRole('button', { name: label });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('disables button when disabled prop is true', () => {
    const label = 'Button';

    render(
      <Button variant='text' label={label} disabled={true} onClick={() => {}} />
    );
    const button = screen.getByRole('button', { name: label });
    expect(button).toBeDisabled();
  });
});
