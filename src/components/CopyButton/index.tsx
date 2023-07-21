import { ContentCopy } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface Props {
  disabled: boolean;
  onClick: () => void;
}

export default function CopyButton({ disabled, onClick }: Props) {
  return (
    <IconButton
      aria-disabled={disabled}
      aria-label='Copy password'
      disabled={disabled}
      color='primary'
      size='large'
      onClick={onClick}
    >
      <ContentCopy fontSize='inherit' />
    </IconButton>
  );
}
