import { fireEvent, render, screen } from '@testing-library/react';

import CopyButton from '.';

const getCopyButton = () => screen.getByLabelText('Copy password');

describe('CopyButton', () => {
  it('renders correctly', () => {
    render(<CopyButton disabled={false} onClick={() => {}} />);
    const copyButton = getCopyButton();
    expect(copyButton).toBeInTheDocument();
    expect(copyButton).toBeEnabled();
  });

  it('calls onClick handler when button is clicked', () => {
    const handleClick = jest.fn();
    render(<CopyButton disabled={false} onClick={handleClick} />);
    const copyButton = getCopyButton();
    fireEvent.click(copyButton);
    expect(handleClick).toHaveBeenCalled();
  });

  it('disables button when disabled prop is true', () => {
    render(<CopyButton disabled={true} onClick={() => {}} />);
    const copyButton = getCopyButton();
    expect(copyButton).toBeDisabled();
    expect(copyButton).toHaveAttribute('aria-disabled', 'true');
  });
});
