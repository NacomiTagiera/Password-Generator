import { Box, Typography } from "@mui/material";

interface Props {
  header: string;
  subheader?: string;
  variant: "h1" | "h2" | "h3" | "h4" | "h6";
  component?: "h1" | "h2" | "h3" | "h4" | "h6";
}

export default function Header({
  header,
  subheader = "",
  variant,
  component = variant,
}: Props) {
  return subheader ? (
    <Box component="header" my={2} mx={1} textAlign="center">
      <Typography variant={variant} component={component}>
        {header}
      </Typography>
      <Typography variant="subtitle1">{subheader}</Typography>
    </Box>
  ) : (
    <Typography variant={variant} component={component}>
      {header}
    </Typography>
  );
}
