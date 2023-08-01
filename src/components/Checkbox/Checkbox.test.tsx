import { fireEvent, render, screen } from '@testing-library/react';

import CheckBox from '.';

describe('CheckBox', () => {
  it('renders the label correctly', () => {
    render(<CheckBox checked={false} label='Test label' onClick={() => {}} />);
    const labelElement = screen.getByText('Test label');
    expect(labelElement).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const onClickMock = jest.fn();
    render(
      <CheckBox checked={false} label='Test label' onClick={onClickMock} />
    );
    const checkBox = screen.getByRole('checkbox');
    fireEvent.click(checkBox);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('displays the correct checked state', () => {
    const label = 'Test label';
    render(<CheckBox checked={false} label={label} onClick={() => {}} />);
    const checkBox = screen.getByLabelText(label) as HTMLInputElement;
    expect(checkBox).not.toBeChecked();

    render(<CheckBox checked={true} label={label} onClick={() => {}} />);
    expect(checkBox).not.toBeChecked();
  });
});
