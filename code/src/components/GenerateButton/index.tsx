import { Button } from "@mui/material";

interface Props {
  onClick: () => void;
}

export default function GenerateButton({ onClick }: Props) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        fontSize: "1.5rem",
        fontWeight: 600,
        letterSpacing: 1,
        mt: 3,
        py: 1,
      }}
    >
      Generate
    </Button>
  );
}
