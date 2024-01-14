'use client';

import { Button as MuiButton, IconButton } from '@mui/material';

type Props = {
  variant: 'text' | 'icon';
  label?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick: () => void;
} & ({ variant: 'text'; label: string } | { variant: 'icon'; icon: React.ReactNode });

export const Button = ({ variant, disabled, icon, label, onClick }: Props) => {
  return variant === 'icon' ? (
    <IconButton
      aria-label={label ?? 'Copy Password'}
      disabled={disabled}
      color='primary'
      size='large'
      onClick={onClick}
      data-testid='copy-btn'
    >
      {icon}
    </IconButton>
  ) : (
    <MuiButton
      variant='contained'
      disabled={disabled}
      onClick={onClick}
      sx={{ mt: '1rem' }}
      data-testid='generate-btn'
    >
      {label}
    </MuiButton>
  );
};
