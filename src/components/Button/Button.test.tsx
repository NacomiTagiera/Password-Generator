import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '.';

describe('Button', () => {
  const label = 'Button';
  const getTextButton = () => screen.getByRole('button', { name: label });

  it('renders correctly with an icon', () => {
    const icon = <span data-testid='icon'>Icon</span>;

    render(<Button variant='icon' icon={icon} onClick={() => {}} />);
    const iconButton = screen.getByTestId('icon');
    expect(iconButton).toBeInTheDocument();
    expect(iconButton).toBeEnabled();
  });

  it('renders correctly with text', () => {
    render(<Button variant='text' label={label} onClick={() => {}} />);
    const buttonEl = getTextButton();
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toBeEnabled();
  });

  it('calls onClick handler when button is clicked', () => {
    const handleClick = jest.fn();

    render(<Button variant='text' label={label} onClick={handleClick} />);
    fireEvent.click(getTextButton());
    expect(handleClick).toHaveBeenCalled();
  });

  it('disables button when disabled prop is true', () => {
    render(<Button variant='text' label={label} disabled onClick={() => {}} />);
    expect(getTextButton()).toBeDisabled();
  });
});
