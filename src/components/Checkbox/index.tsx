'use client';

import { Checkbox, FormControlLabel } from '@mui/material';

type Props = {
  label: string;
  checked?: boolean;
  onClick: () => void;
  testId?: string;
};

export const CheckBox = ({ checked, label, onClick, testId }: Props) => {
  return (
    <FormControlLabel
      sx={{ maxWidth: 'fit-content' }}
      control={
        <Checkbox
          name={label}
          checked={checked}
          onClick={onClick}
          inputProps={{
            'aria-label': label,
          }}
          data-testid={testId}
        />
      }
      label={label}
    />
  );
};
