import { fireEvent, render, screen } from '@testing-library/react';

import LengthSlider from '.';

const getSlider = () => screen.getByRole('slider');
const getInput = () => screen.getByRole('spinbutton');

describe('LengthSlider', () => {
  const onSliderChange = jest.fn();
  const onInputChange = jest.fn();
  const onBlur = jest.fn();
  const value = 10;

  it('renders correctly', () => {
    render(
      <LengthSlider
        value={value}
        onSliderChange={onSliderChange}
        onInputChange={onInputChange}
        onBlur={onBlur}
      />
    );

    expect(screen.getByText('Password length')).toBeInTheDocument();
    expect(getSlider()).toBeInTheDocument();
    expect(getInput()).toBeInTheDocument();
  });

  it('triggers the onSliderChange when the slider is moved', () => {
    render(
      <LengthSlider
        value={value}
        onSliderChange={onSliderChange}
        onInputChange={onInputChange}
        onBlur={onBlur}
      />
    );

    fireEvent.change(getSlider(), { target: { value: 20 } });
    expect(onSliderChange).toHaveBeenCalled();
  });

  it('triggers the onInputChange when the input value is changed', () => {
    render(
      <LengthSlider
        value={value}
        onSliderChange={onSliderChange}
        onInputChange={onInputChange}
        onBlur={onBlur}
      />
    );

    fireEvent.change(getInput(), { target: { value: 20 } });
    expect(onInputChange).toHaveBeenCalled();
  });

  it('triggers the onBlur when the input is blurred', () => {
    render(
      <LengthSlider
        value={value}
        onSliderChange={onSliderChange}
        onInputChange={onInputChange}
        onBlur={onBlur}
      />
    );

    fireEvent.blur(getInput());
    expect(onBlur).toHaveBeenCalled();
  });
});
