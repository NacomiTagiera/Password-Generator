import { IconButton } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

interface Props {
  onClick: () => void;
}

export default function CopyButton({ onClick }: Props) {
  return (
    <IconButton
      aria-label="Copy password"
      color="primary"
      size="large"
      onClick={onClick}
    >
      <ContentCopy fontSize="inherit" />
    </IconButton>
  );
}
