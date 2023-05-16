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
      placeholder="Your Password"
      InputProps={{
        "aria-readonly": "true",
        readOnly: true,
      }}
    />
  );
}
