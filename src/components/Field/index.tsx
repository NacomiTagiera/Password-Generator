import { TextField } from '@mui/material';

type Props = {
  password: string;
};

export default function Field({ password }: Props) {
  return (
    <TextField
      id='password'
      fullWidth
      value={password}
      variant='standard'
      placeholder='Your Password'
      InputProps={{
        readOnly: true,
      }}
    />
  );
}
