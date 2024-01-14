'use client';

import { Box, Grid, Slider as MuiSlider, TextField, Typography } from '@mui/material';

type Props = {
  label: string;
  value: number | '';
  min: number;
  max: number;
  onBlur: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSliderChange: (event: Event, newValue: number | number[]) => void;
};

export const Slider = ({
  label,
  value,
  min,
  max,
  onInputChange,
  onSliderChange,
  onBlur,
}: Props) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  return (
    <Box maxWidth='95%' mx='auto' pt={1}>
      <Typography id='slider-input-label' gutterBottom textAlign='center'>
        {label}
      </Typography>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs>
          <MuiSlider
            aria-describedby='slider-input-label'
            min={min}
            max={max}
            value={typeof value === 'number' ? value : 0}
            onChange={onSliderChange}
            data-testid='length-slider'
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name='password-length'
            aria-describedby='slider-input-label'
            value={value}
            size='small'
            onChange={onInputChange}
            onBlur={onBlur}
            inputProps={{
              min: min,
              max: max,
              type: 'number',
            }}
            data-testid='length-field'
          />
        </Grid>
      </Grid>
    </Box>
  );
};
