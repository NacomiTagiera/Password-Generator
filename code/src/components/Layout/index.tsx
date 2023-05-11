import { ReactNode } from "react";
import { Paper } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Paper
      component="main"
      elevation={8}
      sx={{
        border: 2.5,
        borderRadius: 2,
        width: "min(40rem, 95vw)",
      }}
    >
      <Header />
      {children}
      <Footer />
    </Paper>
  );
}
