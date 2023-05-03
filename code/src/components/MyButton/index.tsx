import { ReactNode } from "react";
import { Button } from "@mui/material";

interface Props {
  icon: ReactNode;
  label: string;
  text?: string;
  onClick: () => void;
}

export default function MyButton({ icon, label, text, onClick }: Props) {
  return (
    <Button
      variant="contained"
      startIcon={icon}
      aria-label={label}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
