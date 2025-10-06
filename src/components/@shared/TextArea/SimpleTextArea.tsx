import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import * as React from "react";
interface TextAreaProps {
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value?: string;
}
const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? grey[900] : grey[200]};


  &:hover {
    border-color: ${grey[400]};
  }

  &:focus {
    border-color: ${grey[500]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

export default function SimpleTextArea({
  disabled,
  onChange,
  placeholder = "",
  value,
}: Readonly<TextAreaProps>) {
  return (
    <TextareaAutosize
      aria-label="empty textarea"
      disabled={disabled}
      minRows={4}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
}
