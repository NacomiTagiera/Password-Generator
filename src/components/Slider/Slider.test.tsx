import { fireEvent, render, screen } from '@testing-library/react';

import { Slider } from '.';

describe('Slider', () => {
  const getSliderEl = () => screen.getByRole('slider');
  const getInputEl = () => screen.getByRole('spinbutton');
  const label = 'Password length';

  it('renders the label and value correctly', () => {
    render(
      <Slider
        label={label}
        min={6}
        max={20}
        value={10}
        onSliderChange={() => {}}
        onInputChange={() => {}}
        onBlur={() => {}}
      />,
    );
    const sliderEl = getSliderEl();

    expect(screen.getByText('Password length')).toBeInTheDocument();
    expect(sliderEl).toBeInTheDocument();
    expect(getInputEl()).toBeInTheDocument();
    expect(sliderEl).toHaveValue('10');
  });

  test('renders the slider and the input field with correct attributes', () => {
    render(
      <Slider
        label={label}
        min={6}
        max={20}
        value={10}
        onBlur={() => {}}
        onInputChange={() => {}}
        onSliderChange={() => {}}
      />,
    );
    const sliderEl = getSliderEl();
    const inputEl = getInputEl();

    expect(sliderEl).toBeInTheDocument();
    expect(sliderEl).toHaveAttribute('min', '6');
    expect(sliderEl).toHaveAttribute('max', '20');

    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('type', 'number');
    expect(inputEl).toHaveAttribute('min', '6');
    expect(inputEl).toHaveAttribute('max', '20');
  });

  test('clamps the slider value to max when it exceeds the maximum value', () => {
    render(
      <Slider
        label={label}
        min={6}
        max={20}
        value={21}
        onSliderChange={() => {}}
        onInputChange={() => {}}
        onBlur={() => {}}
      />,
    );
    expect(getSliderEl()).toHaveValue('20');
  });

  test('clamps the slider value to min when it is less than the minimum value', () => {
    render(
      <Slider
        label={label}
        min={6}
        max={20}
        value={5}
        onSliderChange={() => {}}
        onInputChange={() => {}}
        onBlur={() => {}}
      />,
    );
    expect(getSliderEl()).toHaveValue('6');
  });

  it('swap min and max values when min is greater than max', () => {
    render(
      <Slider
        label={label}
        min={20}
        max={6}
        value={10}
        onSliderChange={() => {}}
        onInputChange={() => {}}
        onBlur={() => {}}
      />,
    );
    const sliderEl = getSliderEl();
    expect(sliderEl).toHaveAttribute('min', '6');
    expect(sliderEl).toHaveAttribute('max', '20');
  });

  it('calls the onBlur, onInputChange, and onSliderChange functions when interacting with the input and slider', () => {
    const handleInputBlur = jest.fn();
    const handleInputChange = jest.fn();
    const handleSliderChange = jest.fn();

    render(
      <Slider
        label={label}
        min={6}
        max={20}
        value={10}
        onSliderChange={handleSliderChange}
        onInputChange={handleInputChange}
        onBlur={handleInputBlur}
      />,
    );

    const inputEl = getInputEl();
    fireEvent.change(inputEl, { target: { value: '15' } });
    fireEvent.blur(inputEl);
    fireEvent.change(getSliderEl(), { target: { value: '12' } });
    expect(handleInputChange).toHaveBeenCalled();
    expect(handleInputBlur).toHaveBeenCalled();
    expect(handleSliderChange).toHaveBeenCalled();
  });
});
