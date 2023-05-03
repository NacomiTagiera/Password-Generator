import { Box, Grid, Input, Slider, Typography } from "@mui/material";

interface Props {
  maxLength?: number;
  minLength?: number;
  value: number;
  onBlur: () => void;
  onInputChange: () => void;
  onSliderChange: () => void;
}

export default function LengthSlider({
  maxLength = 30,
  minLength = 5,
  value,
  onInputChange,
  onSliderChange,
  onBlur,
}: Props) {
  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Password length
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={onSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={onInputChange}
            onBlur={onBlur}
            inputProps={{
              step: 1,
              min: minLength,
              max: maxLength,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
