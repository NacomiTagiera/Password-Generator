import { useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  IconButton,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Close, ContentCopy } from "@mui/icons-material";
import {
  defaultPasswordLength,
  usePasswordGenerator,
} from "../hooks/usePasswordGenerator";
import "./App.css";

const checkboxStyles = {
  p: 0,
  scale: "1.4",
};

const labelStyles = {
  fontSize: "2rem",
  display: "flex",
  justifyContent: "space-between",
};

export default function App() {
  const [includeDigits, setIncludeDigits] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [length, setLength] = useState<number>(defaultPasswordLength);
  const [showAlert, setShowAlert] = useState<boolean>(false);

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

  const handleCopyPw = () => {
    navigator.clipboard.writeText(password);
    setShowAlert(true);
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
              style: { fontSize: "1.5rem", fontWeight: 500, paddingBlock: 15 },
            }}
          />
          <Button
            title="Copy"
            variant="contained"
            disabled={!password.length}
            onClick={handleCopyPw}
          >
            <ContentCopy />
          </Button>
        </Box>

        <Stack spacing={2} sx={{ mt: 5 }}>
          <Typography
            sx={{ fontSize: "2rem", fontWeight: 500, textAlign: "center" }}
          >
            {`Password length: ${length}`}
          </Typography>
          <Slider
            min={8}
            max={30}
            value={length}
            valueLabelDisplay="auto"
            onChange={handleChangeLength}
          />

          <label style={labelStyles}>
            Include uppercase letters
            <Checkbox
              sx={checkboxStyles}
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
          </label>

          <label style={labelStyles}>
            Include lowercase letters
            <Checkbox
              sx={checkboxStyles}
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
          </label>

          <label style={labelStyles}>
            Include digits
            <Checkbox
              sx={checkboxStyles}
              checked={includeDigits}
              onChange={(e) => setIncludeDigits(e.target.checked)}
            />
          </label>

          <label style={labelStyles}>
            Include symbols
            <Checkbox
              sx={checkboxStyles}
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
          </label>
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
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            letterSpacing: 1,
            mt: 3,
            py: 1,
          }}
          onClick={generatePassword}
        >
          Generate
        </Button>
      </Card>
      <Collapse in={showAlert} sx={{ position: "absolute", top: 0 }}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={() => {
                setShowAlert(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ fontSize: "2rem", fontWeight: 500 }}
        >
          <AlertTitle sx={{ fontSize: "2.5rem" }}>Success!</AlertTitle>
          Password has been successfully copied!
        </Alert>
      </Collapse>
    </>
  );
}
