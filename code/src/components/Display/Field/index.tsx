interface Props {
  password: string;
}

export default function Field({ password }: Props) {
  return <input type="password" value={password} />;
}
