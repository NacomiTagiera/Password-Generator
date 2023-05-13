import { TextField } from "@mui/material";

interface Props {
  password: string;
}

export default function Field({ password }: Props) {
  return (
    <TextField
      fullWidth
      value={password}
      variant="standard"
      InputProps={{
        "aria-readonly": "true",
        readOnly: true,
        style: { fontSize: "1.5rem", fontWeight: 500 },
      }}
    />
  );
}
