import { fireEvent, render, screen } from '@testing-library/react';

import { CheckBox } from '.';

describe('CheckBox', () => {
  const label = 'Label';
  const getCheckbox = () => screen.getByLabelText(label);

  it('renders the label and checked state correctly', () => {
    render(<CheckBox label={label} onClick={() => {}} />);
    const labelEl = screen.getByText(label);
    expect(labelEl).toBeInTheDocument();
    expect(getCheckbox()).not.toBeChecked();
  });

  it('calls the onClick function when clicked', () => {
    const onClickMock = jest.fn();
    render(<CheckBox label={label} onClick={onClickMock} />);
    fireEvent.click(getCheckbox());
    expect(onClickMock).toHaveBeenCalled();
  });

  it('displays the correct checked state when checked prop is passed', () => {
    render(<CheckBox checked label={label} onClick={() => {}} />);
    expect(getCheckbox()).toBeChecked();
  });
});
