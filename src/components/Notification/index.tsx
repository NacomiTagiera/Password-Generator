import { Alert, Slide, type SlideProps, Snackbar } from '@mui/material';

type Props = {
  children: React.ReactNode;
  open?: boolean;
  onClose: () => void;
};

type TransitionProps = Omit<SlideProps, 'direction'>;

function Transition(props: TransitionProps) {
  return <Slide {...props} direction='right' />;
}

export const Notification = ({ children, open, onClose }: Props) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      data-testid='notification'
    >
      <Alert onClose={onClose}>{children}</Alert>
    </Snackbar>
  );
};
