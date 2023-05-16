import { Checkbox, FormControlLabel } from "@mui/material";

interface Props {
  checked: boolean;
  label: string;
  onClick: () => void;
}

export default function CheckBox({ checked, label, onClick }: Props) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onClick={onClick}
          inputProps={{
            "aria-label": `Checkbox for ${label}`,
          }}
        />
      }
      label={label}
    />
  );
}
