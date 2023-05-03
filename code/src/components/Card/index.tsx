import { ReactNode } from "react";
import { Paper } from "@mui/material";

interface Props {
  children: ReactNode;
}

export default function Card({ children }: Props) {
  return (
    <Paper
      sx={{
        border: 2.5,
        borderRadius: 2,
        boxShadow: 14,
        marginInline: "auto",
        padding: "3rem",
        width: "40rem",
      }}
    >
      {children}
    </Paper>
  );
}
