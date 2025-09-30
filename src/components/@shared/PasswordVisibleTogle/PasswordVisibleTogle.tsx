import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

interface Props {
  isVisible: boolean;
  onToggle: () => void;
}
const PasswordVisibilityToggle = ({ isVisible, onToggle }: Props) => {
  return (
    <InputAdornment position="end">
      <IconButton aria-label="toggle password visibility" onClick={onToggle}>
        {isVisible ? (
          <VisibilityOff sx={{ color: "text.primary" }} />
        ) : (
          <Visibility sx={{ color: "text.primary" }} />
        )}
      </IconButton>
    </InputAdornment>
  );
};

export { PasswordVisibilityToggle };
