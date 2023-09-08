'use client';

import { Checkbox, FormControlLabel } from '@mui/material';

type Props = {
  checked: boolean;
  label: string;
  onClick: () => void;
};

export default function CheckBox({ checked, label, onClick }: Props) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name={label}
          checked={checked}
          onClick={onClick}
          inputProps={{
            'aria-label': label,
          }}
        />
      }
      label={label}
    />
  );
}
