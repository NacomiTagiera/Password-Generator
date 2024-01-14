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
    includeNumbers: true,
    includeSymbols: true,
    length: DEFAULT_PW_LENGTH,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [password, setPassword] = useState('');

  const toggleCheckbox = (
    checkbox: 'includeLowerCase' | 'includeUpperCase' | 'includeNumbers' | 'includeSymbols',
  ) => {
    setPasswordSettings((prevState) => ({ ...prevState, [checkbox]: !prevState[checkbox] }));
  };

  const handleCopyPw = () => {
    void navigator.clipboard.writeText(password);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleInputBlur = () => {
    if (passwordSettings.length === '' || passwordSettings.length < PW_MIN_LENGTH) {
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
          variant='icon'
          icon={<ContentCopy fontSize='inherit' />}
          disabled={!password || showAlert}
          onClick={handleCopyPw}
        />
      </Stack>
      <Slider
        label='Password length'
        value={passwordSettings.length}
        min={PW_MIN_LENGTH}
        max={PW_MAX_LENGTH}
        onBlur={handleInputBlur}
        onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPasswordSettings({
            ...passwordSettings,
            length: event.target.value === '' ? '' : Number(event.target.value),
          });
        }}
        onSliderChange={(_event: Event, newValue: number | number[]) => {
          setPasswordSettings({ ...passwordSettings, length: newValue as number });
        }}
      />
      <FormGroup>
        <CheckBox
          checked={passwordSettings.includeLowerCase}
          label='Include lowercase letters'
          onClick={() => toggleCheckbox('includeLowerCase')}
          testId='lowercase-checkbox'
        />
        <CheckBox
          checked={passwordSettings.includeUpperCase}
          label='Include uppercase letters'
          onClick={() => toggleCheckbox('includeUpperCase')}
          testId='uppercase-checkbox'
        />
        <CheckBox
          checked={passwordSettings.includeNumbers}
          label='Include numbers'
          onClick={() => toggleCheckbox('includeNumbers')}
          testId='digits-checkbox'
        />
        <CheckBox
          checked={passwordSettings.includeSymbols}
          label='Include special characters'
          onClick={() => toggleCheckbox('includeSymbols')}
          testId='symbols-checkbox'
        />
      </FormGroup>
      <Button
        variant='text'
        label='Generate'
        disabled={
          !passwordSettings.includeLowerCase &&
          !passwordSettings.includeUpperCase &&
          !passwordSettings.includeNumbers &&
          !passwordSettings.includeSymbols
        }
        onClick={() => setPassword(generatePassword(passwordSettings))}
      />
      <Notification open={showAlert} onClose={() => setShowAlert(false)} />
    </>
  );
};
