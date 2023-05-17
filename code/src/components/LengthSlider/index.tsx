import { Box, Grid, Slider, TextField, Typography } from "@mui/material";

interface Props {
  value: number | "";
  onBlur: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSliderChange: (event: Event, newValue: number | number[]) => void;
}

export default function LengthSlider({
  value,
  onInputChange,
  onSliderChange,
  onBlur,
}: Props) {
  return (
    <Box maxWidth="95%" mx="auto" pt={1}>
      <Typography id="input-slider" gutterBottom textAlign="center">
        Password length
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            min={6}
            max={32}
            value={typeof value === "number" ? value : 0}
            onChange={onSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            value={value}
            size="small"
            onChange={onInputChange}
            onBlur={onBlur}
            inputProps={{
              min: 6,
              max: 32,
              "aria-labelledby": "input-slider",
              type: "number",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
