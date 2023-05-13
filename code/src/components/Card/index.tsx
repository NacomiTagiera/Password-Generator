import { ReactNode } from "react";
import { Paper } from "@mui/material";

interface Props {
  children: ReactNode;
}

export default function Card({ children }: Props) {
  return (
    <Paper
      component="main"
      elevation={8}
      sx={{
        border: 2.5,
        borderRadius: "1.5rem",
        padding: "3rem",
        width: "40rem",
      }}
    >
      {children}
    </Paper>
  );
}
