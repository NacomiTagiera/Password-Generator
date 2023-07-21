import { fireEvent, render, screen } from '@testing-library/react';

import GenerateButton from '.';

const getButton = () => screen.getByText('Generate');

describe('GenerateButton', () => {
  it('renders correctly', () => {
    render(<GenerateButton disabled={false} onClick={() => {}} />);
    const generateButton = getButton();
    expect(generateButton).toBeInTheDocument();
    expect(generateButton).toBeEnabled();
  });

  it('calls onClick handler when button is clicked', () => {
    const handleClick = jest.fn();
    render(<GenerateButton disabled={false} onClick={handleClick} />);
    const generateButton = getButton();
    fireEvent.click(generateButton);
    expect(handleClick).toHaveBeenCalled();
  });

  it('disables button when disabled prop is true', () => {
    render(<GenerateButton disabled={true} onClick={() => {}} />);
    const generateButton = getButton();
    expect(generateButton).toBeDisabled();
    expect(generateButton).toHaveAttribute('aria-disabled', 'true');
  });
});
