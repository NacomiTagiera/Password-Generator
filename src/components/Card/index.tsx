import { Paper } from '@mui/material';

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <Paper
      component='main'
      elevation={8}
      sx={{
        border: 2.5,
        borderRadius: 3,
        padding: { xs: '0.8rem', lg: '1.4rem' },
        textAlign: 'center',
      }}
    >
      {children}
    </Paper>
  );
};
