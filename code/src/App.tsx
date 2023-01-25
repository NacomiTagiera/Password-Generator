import { useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { usePasswordGenerator } from "./hooks/usePasswordGenerator";
import "./App.css";

const boxStyles = {
  display: "flex",
  justifyContent: "space-between",
};

const typographyStyles = {
  fontSize: "2rem",
  fontWeight: 500,
};

export default function App() {
  const [includeDigits, setIncludeDigits] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [length, setLength] = useState<number>(14);

  const { password, generatePassword } = usePasswordGenerator({
    includeDigits,
    includeLowercase,
    includeSymbols,
    includeUppercase,
    length,
  });

  const handleChangeLength = (event: Event, newLength: number | number[]) => {
    setLength(newLength as number);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          border: 2.5,
          borderRadius: "1.5rem",
          boxShadow: 14,
          marginInline: "auto",
          padding: "3rem",
          width: "40rem",
        }}
      >
        <Typography
          component="h2"
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
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <TextField
            variant="outlined"
            value={password}
            placeholder="Password..."
            autoComplete="off"
            inputProps={{
              readOnly: true,
            }}
            sx={{ fontSize: "4rem", fontWeight: "bold" }}
          />
          <Button
            variant="contained"
            disabled={isCopied || !password.length}
            onClick={() => {
              navigator.clipboard.writeText(password);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 2500);
            }}
          >
            <ContentCopyIcon />
          </Button>
        </Box>
        <Stack spacing={1} sx={{ mt: 5 }}>
          <Typography sx={{ ...typographyStyles, textAlign: "center" }}>
            Password length
          </Typography>
          <Slider
            min={8}
            max={30}
            value={length}
            valueLabelDisplay="auto"
            onChange={handleChangeLength}
          />

          <Box sx={boxStyles}>
            <Typography sx={typographyStyles}>
              Include uppercase letters
            </Typography>
            <Checkbox
              sx={{ scale: "1.2" }}
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
          </Box>

          <Box sx={boxStyles}>
            <Typography sx={typographyStyles}>
              Include lowercase letters
            </Typography>
            <Checkbox
              sx={{ scale: "1.2" }}
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
          </Box>

          <Box sx={boxStyles}>
            <Typography sx={typographyStyles}>Include digits</Typography>
            <Checkbox
              sx={{ scale: "1.2" }}
              checked={includeDigits}
              onChange={(e) => setIncludeDigits(e.target.checked)}
            />
          </Box>

          <Box sx={boxStyles}>
            <Typography sx={typographyStyles}>Include symbols</Typography>
            <Checkbox
              sx={{ scale: "1.2" }}
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
          </Box>
        </Stack>
        <Button
          variant="contained"
          fullWidth
          disabled={
            !includeDigits &&
            !includeLowercase &&
            !includeSymbols &&
            !includeUppercase
          }
          sx={{ fontWeight: 600, letterSpacing: 1, mt: 3 }}
          onClick={generatePassword}
        >
          Generate password
        </Button>
      </Card>
      <Collapse in={isCopied} sx={{ position: "absolute", top: 0 }}>
        <Alert severity="success" sx={{ fontSize: "2rem", fontWeight: 500 }}>
          <AlertTitle sx={{ fontSize: "2.5rem" }}>Success!</AlertTitle>
          Password has been successfully copied!
        </Alert>
      </Collapse>
    </>
  );
}
