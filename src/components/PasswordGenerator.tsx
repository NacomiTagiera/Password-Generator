'use client';

import { Fragment, useState } from 'react';
import { ContentCopy } from '@mui/icons-material';
import { FormGroup, Stack } from '@mui/material';

import {
  DEFAULT_PW_LENGTH,
  generatePassword,
  PW_MAX_LENGTH,
  PW_MIN_LENGTH,
} from '@/utils/password-utils';

import Button from './Button';
import Card from './Card';
import CheckBox from './Checkbox';
import Field from './Field';
import Header from './Header';
import LengthSlider from './LengthSlider';
import Notification from './Notification';

export default function PasswordGenerator() {
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState<number | ''>(DEFAULT_PW_LENGTH);

  const handleCopyPw = () => {
    void navigator.clipboard.writeText(password);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleBlur = () => {
    if (passwordLength === '' || passwordLength < PW_MIN_LENGTH) {
      setPasswordLength(PW_MIN_LENGTH);
    } else if (passwordLength > PW_MAX_LENGTH) {
      setPasswordLength(PW_MAX_LENGTH);
    }
  };

  return (
    <Fragment>
      <Card>
        <Header />
        <Stack direction='row' spacing={1} alignItems='center'>
          <Field password={password} />
          <Button
            variant='icon'
            icon={<ContentCopy fontSize='inherit' />}
            disabled={!password || showAlert}
            onClick={handleCopyPw}
          />
        </Stack>
        <LengthSlider
          value={passwordLength}
          onBlur={handleBlur}
          onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordLength(event.target.value === '' ? '' : Number(event.target.value));
          }}
          onSliderChange={(_event: Event, newValue: number | number[]) => {
            setPasswordLength(newValue as number);
          }}
        />
        <FormGroup>
          <CheckBox
            checked={includeLowerCase}
            label='Include lowercase letters'
            onClick={() => setIncludeLowerCase((prevState) => !prevState)}
          />
          <CheckBox
            checked={includeUpperCase}
            label='Include uppercase letters'
            onClick={() => setIncludeUpperCase((prevState) => !prevState)}
          />
          <CheckBox
            checked={includeNumbers}
            label='Include numbers'
            onClick={() => setIncludeNumbers((prevState) => !prevState)}
          />
          <CheckBox
            checked={includeSymbols}
            label='Include special characters'
            onClick={() => setIncludeSymbols((prevState) => !prevState)}
          />
        </FormGroup>
        <Button
          variant='text'
          label='Generate'
          disabled={!includeLowerCase && !includeUpperCase && !includeNumbers && !includeSymbols}
          onClick={() =>
            setPassword(
              generatePassword(
                includeLowerCase,
                includeNumbers,
                includeSymbols,
                includeUpperCase,
                Number(passwordLength),
              ),
            )
          }
        />
      </Card>
      <Notification open={showAlert} onClose={() => setShowAlert(false)} />
    </Fragment>
  );
}
