interface Props {
  isChecked: boolean;
  onChange: () => void;
}

export default function Checkbox({ isChecked, onChange }: Props) {
  return <input type="checkbox" checked={isChecked} onChange={onChange} />;
}
