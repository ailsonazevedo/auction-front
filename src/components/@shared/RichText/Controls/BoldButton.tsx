import FormatBoldIcon from "@mui/icons-material/FormatBold";
import { Editor } from "@tiptap/react";

import { StyledButton } from "../StyledButton";

interface Props {
  editor: Editor;
}

const BoldButton = ({ editor }: Props) => {
  return (
    <StyledButton
      className={editor.isActive("bold") ? "botao-ativo" : ""}
      onClick={() => editor.chain().focus().toggleBold().run()}
      startIcon={<FormatBoldIcon sx={{ m: 0, padding: 0 }} />}
      variant={editor.isActive("bold") ? "contained" : "outlined"}
    >
      Negrito
    </StyledButton>
  );
};

export { BoldButton };
