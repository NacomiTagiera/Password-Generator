import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
}

type TransitionProps = Omit<SlideProps, "direction">;

function Transition(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

export default function Notification({ open, onClose }: Props) {
  return (
    <Snackbar open={open} onClose={onClose} TransitionComponent={Transition}>
      <Alert onClose={onClose}>Password has been copied</Alert>
    </Snackbar>
  );
}
