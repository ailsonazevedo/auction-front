import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  "&.botao-ativo": {
    backgroundColor: `${theme.palette.richText.button.hover}`,
  },
  "&:hover": {
    backgroundColor: `${theme.palette.richText.button.hover}`,
    border: `1px solid ${theme.palette.richText.button.borderColor}`,
    color: `${theme.palette.richText.button.color}`,
  },
  border: `1px solid ${theme.palette.richText.button.borderColor}`,
  color: `${theme.palette.richText.button.color}`,
  minWidth: 0,
  padding: "0.2rem",
}));

export { StyledButton };
