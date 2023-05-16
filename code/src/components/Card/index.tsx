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
        borderRadius: 3,
        padding: { xs: "0.8rem", lg: "1.4rem" },
        textAlign: "center",
      }}
    >
      {children}
    </Paper>
  );
}
