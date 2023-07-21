import { Button } from '@mui/material';

interface Props {
  disabled: boolean;
  onClick: () => void;
}

export default function GenerateButton({ disabled, onClick }: Props) {
  return (
    <Button
      variant='contained'
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
      sx={{ mt: '1rem' }}
    >
      Generate
    </Button>
  );
}
