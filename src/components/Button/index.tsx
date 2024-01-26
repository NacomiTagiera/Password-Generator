import { Button as MuiButton, IconButton } from '@mui/material';

type ButtonProps = Omit<React.ComponentProps<typeof MuiButton>, 'type'>;
type IconButtonProps = Omit<React.ComponentProps<typeof IconButton>, 'type'>;

type Props = {
  type?: 'text' | 'icon';
} & (ButtonProps | IconButtonProps);

export const Button = ({ type = 'text', children, ...rest }: Props) => {
  return type === 'text' ? (
    <MuiButton {...(rest as ButtonProps)}>{children}</MuiButton>
  ) : (
    <IconButton {...(rest as IconButtonProps)}>{children}</IconButton>
  );
};
