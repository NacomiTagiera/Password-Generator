import { TextField } from '@mui/material';

export const Field = ({ password }: { password: string }) => {
  return (
    <TextField
      name='password'
      fullWidth
      value={password}
      variant='standard'
      placeholder='Your Password'
      InputProps={{
        readOnly: true,
      }}
    />
  );
};
