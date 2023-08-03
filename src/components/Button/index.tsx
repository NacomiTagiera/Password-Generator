'use client';

import { ReactNode } from 'react';
import { Button as MuiButton, IconButton } from '@mui/material';

type ButtonVariant = 'text' | 'icon';

type Props = {
  variant: ButtonVariant;
  disabled?: boolean;
  icon?: ReactNode;
  label?: string;
  onClick: () => void;
} & ({ variant: 'text'; label: string } | { variant: 'icon'; icon: ReactNode });

export default function Button({
  variant,
  disabled = false,
  icon,
  label,
  onClick,
}: Props) {
  return variant === 'icon' ? (
    <IconButton
      aria-label={label ?? 'Copy Password'}
      disabled={disabled}
      color='primary'
      size='large'
      onClick={onClick}
    >
      {icon}
    </IconButton>
  ) : (
    <MuiButton
      variant='contained'
      disabled={disabled}
      onClick={onClick}
      sx={{ mt: '1rem' }}
    >
      {label}
    </MuiButton>
  );
}
