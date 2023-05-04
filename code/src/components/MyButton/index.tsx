import { ReactNode } from "react";
import { Button, IconButton } from "@mui/material";

interface Props {
  icon: ReactNode;
  label: string;
  text?: string;
  onClick: () => void;
}

export default function MyButton({ icon, label, text, onClick }: Props) {
  return text ? (
    <Button
      variant="contained"
      startIcon={icon}
      aria-label={label}
      onClick={onClick}
    >
      {text}
    </Button>
  ) : (
    <IconButton aria-label={label} size="large" onClick={onClick}>
      {icon}
    </IconButton>
  );
}
