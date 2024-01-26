import Typography from '@mui/material/Typography';

export const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography component='h1' fontSize='2rem' fontWeight='700' gutterBottom>
      {children}
    </Typography>
  );
};
