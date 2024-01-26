import { Checkbox, type CheckboxProps, FormControlLabel } from '@mui/material';

type Props = {
  label: string;
} & CheckboxProps;

export const CheckBox = ({ label, ...rest }: Props) => {
  return (
    <FormControlLabel
      sx={{ maxWidth: 'fit-content' }}
      control={
        <Checkbox
          inputProps={{
            'aria-label': label,
          }}
          {...rest}
        />
      }
      label={label}
    />
  );
};
