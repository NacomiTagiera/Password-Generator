import { Typography } from "@mui/material";

export default function Header() {
  return (
    <Typography
      component="h1"
      sx={{
        fontSize: "3rem",
        fontWeight: 700,
        lineHeight: 1.1,
        mb: "2.5rem",
        textAlign: "center",
      }}
    >
      Password Generator
    </Typography>
  );
}
