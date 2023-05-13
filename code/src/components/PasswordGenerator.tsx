import { Fragment, useEffect, useState } from "react";
import { Box, FormGroup, Stack } from "@mui/material";

import Card from "./Card";
import CheckBox from "./Checkbox";
import CopyButton from "./CopyButton";
import Field from "./Field";
import GenerateButton from "./GenerateButton";
import Header from "./Header";
import LengthSlider from "./LengthSlider";
import Notification from "./Notification";
import {
  defaultPasswordLength,
  generatePassword,
} from "@/utils/password-utils";

export default function PasswordGenerator() {
  const [includeLowerCase, setIncludeLowerCase] = useState<boolean>(true);
  const [includeUpperCase, setIncludeUpperCase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordLength, setPasswordLength] = useState<number>(
    defaultPasswordLength
  );

  const handleCopyPw = () => {
    navigator.clipboard.writeText(password);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Fragment>
      <Card>
        <Header />
        <Stack direction="row" spacing={1} alignItems="center">
          <Field password={password} />
          <CopyButton onClick={handleCopyPw} />
        </Stack>
        <LengthSlider
          value={passwordLength}
          onBlur={() => {}}
          onInputChange={() => {}}
          onSliderChange={() => {}}
        />
        <FormGroup>
          <CheckBox
            checked={includeLowerCase}
            label="Include lowercase letters"
            onClick={() => setIncludeLowerCase((prevState) => !prevState)}
          />
          <CheckBox
            checked={includeUpperCase}
            label="Include uppercase letters"
            onClick={() => setIncludeUpperCase((prevState) => !prevState)}
          />
          <CheckBox
            checked={includeNumbers}
            label="Include numbers"
            onClick={() => setIncludeNumbers((prevState) => !prevState)}
          />
          <CheckBox
            checked={includeSymbols}
            label="Include special characters"
            onClick={() => setIncludeSymbols((prevState) => !prevState)}
          />
        </FormGroup>
        <GenerateButton
          onClick={() =>
            setPassword(
              generatePassword(
                includeNumbers,
                includeLowerCase,
                includeSymbols,
                includeUpperCase,
                passwordLength
              )
            )
          }
        />
      </Card>
      <Notification open={showAlert} onClose={() => setShowAlert(false)} />
    </Fragment>
  );
}
