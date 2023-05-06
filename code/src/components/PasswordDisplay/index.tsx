import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import { FileCopy } from "@mui/icons-material";
import MyButton from "../MyButton";

interface Props {
  password: string;
}

export default function PasswordDisplay({ password }: Props) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextField
        color={copySuccess ? "success" : "primary"}
        fullWidth
        label={copySuccess ? "Copied!" : "Generated Password"}
        value={password}
        variant="standard"
        InputProps={{
          readOnly: true,
        }}
      />
      <MyButton
        icon={<FileCopy />}
        label="Copy Password"
        onClick={handleCopyPassword}
      />
    </Stack>
  );
}
