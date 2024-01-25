'use client';

import { useState } from 'react';
import { ContentCopy } from '@mui/icons-material';
import { FormGroup, Stack } from '@mui/material';

import { type PasswordSettings } from '@/types';
import {
  DEFAULT_PW_LENGTH,
  generatePassword,
  PW_MAX_LENGTH,
  PW_MIN_LENGTH,
} from '@/utils/password-utils';

import { Button } from './Button';
import { CheckBox } from './Checkbox';
import { Field } from './Field';
import { Notification } from './Notification';
import { Slider } from './Slider';

export const PasswordGenerator = () => {
  const [passwordSettings, setPasswordSettings] = useState<PasswordSettings>({
    includeLowerCase: true,
    includeUpperCase: true,
    includeDigits: true,
    includeSymbols: true,
    length: DEFAULT_PW_LENGTH,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [password, setPassword] = useState('');

  const toggleCheckbox = (
    checkbox: 'includeLowerCase' | 'includeUpperCase' | 'includeDigits' | 'includeSymbols',
  ) => {
    setPasswordSettings((prevState) => ({ ...prevState, [checkbox]: !prevState[checkbox] }));
  };

  const handleCopyPw = () => {
    void navigator.clipboard.writeText(password);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleInputBlur = () => {
    if (passwordSettings.length < PW_MIN_LENGTH) {
      setPasswordSettings({ ...passwordSettings, length: PW_MIN_LENGTH });
    } else if (passwordSettings.length > PW_MAX_LENGTH) {
      setPasswordSettings({ ...passwordSettings, length: PW_MAX_LENGTH });
    }
  };

  return (
    <>
      <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
        <Field password={password} />
        <Button
          type='icon'
          color='primary'
          size='large'
          disabled={!password || showAlert}
          aria-label='Copy password to clipboard'
          onClick={handleCopyPw}
          data-testid='copy-btn'
        >
          <ContentCopy fontSize='inherit' />
        </Button>
      </Stack>
      <Slider
        label='Password length'
        value={passwordSettings.length}
        min={PW_MIN_LENGTH}
        max={PW_MAX_LENGTH}
        onBlur={handleInputBlur}
        onInputChange={(event) => {
          setPasswordSettings({
            ...passwordSettings,
            length: Number(event.target.value) || PW_MIN_LENGTH,
          });
        }}
        onSliderChange={(_event, newValue: number | number[]) => {
          setPasswordSettings({ ...passwordSettings, length: newValue as number });
        }}
      />
      <FormGroup>
        <CheckBox
          name='lowercase'
          checked={passwordSettings.includeLowerCase}
          label='Include lowercase letters'
          onChange={() => toggleCheckbox('includeLowerCase')}
          data-testid='lowercase-checkbox'
        />
        <CheckBox
          name='uppercase'
          checked={passwordSettings.includeUpperCase}
          label='Include uppercase letters'
          onChange={() => toggleCheckbox('includeUpperCase')}
          data-testid='uppercase-checkbox'
        />
        <CheckBox
          name='digits'
          checked={passwordSettings.includeDigits}
          label='Include digits'
          onChange={() => toggleCheckbox('includeDigits')}
          data-testid='digits-checkbox'
        />
        <CheckBox
          name='symbols'
          checked={passwordSettings.includeSymbols}
          label='Include special characters'
          onChange={() => toggleCheckbox('includeSymbols')}
          data-testid='symbols-checkbox'
        />
      </FormGroup>
      <Button
        variant='contained'
        disabled={
          !passwordSettings.includeLowerCase &&
          !passwordSettings.includeUpperCase &&
          !passwordSettings.includeDigits &&
          !passwordSettings.includeSymbols
        }
        sx={{ mt: '1rem' }}
        onClick={() => setPassword(generatePassword(passwordSettings))}
        data-testid='generate-btn'
      >
        Generate
      </Button>
      <Notification open={showAlert} onClose={() => setShowAlert(false)}>
        Copied to clipboard!
      </Notification>
    </>
  );
};
