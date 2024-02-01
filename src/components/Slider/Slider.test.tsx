import { fireEvent, render, screen } from '@testing-library/react';

import { Slider } from '.';

describe('Slider', () => {
  const label = 'Password length';

  it('renders the label and the value correctly', () => {
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

    screen.getByText(label);
    expect(screen.getByRole('spinbutton')).toHaveValue(10);
    expect(screen.getByRole('slider')).toHaveValue('10');
  });

  it('swaps min and max values when min is greater than max', () => {
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

    const sliderEl = screen.getByRole('slider');
    expect(sliderEl).toHaveAttribute('min', '6');
    expect(sliderEl).toHaveAttribute('max', '20');
  });

  it('calls the onBlur, onInputChange, and onSliderChange functions when user interacts with the input or the slider', () => {
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

    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '11' } });
    fireEvent.blur(screen.getByRole('spinbutton'));
    fireEvent.change(screen.getByRole('slider'), { target: { value: '12' } });

    expect(handleInputChange).toHaveBeenCalledTimes(1);
    expect(handleInputBlur).toHaveBeenCalledTimes(1);
    expect(handleSliderChange).toHaveBeenCalledTimes(1);
  });

  it('clamps the slider value to min when it is less than the minimum value', () => {
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

    expect(screen.getByRole('slider')).toHaveValue('6');
  });

  it('clamps the slider value to max when it exceeds the maximum value', () => {
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

    expect(screen.getByRole('slider')).toHaveValue('20');
  });
});
