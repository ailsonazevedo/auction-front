import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import { Editor } from "@tiptap/react";

import { StyledButton } from "../StyledButton";

interface Props {
  editor: Editor;
}

const StrikeButton = ({ editor }: Props) => {
  return (
    <StyledButton
      className={editor.isActive("strike") ? "botao-ativo" : ""}
      onClick={() => editor.chain().focus().toggleStrike().run()}
      startIcon={<FormatStrikethroughIcon />}
      variant={editor.isActive("strike") ? "contained" : "outlined"}
    >
      Cortado
    </StyledButton>
  );
};

export { StrikeButton };
