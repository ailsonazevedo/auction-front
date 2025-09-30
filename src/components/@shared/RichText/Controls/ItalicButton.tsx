import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import { Editor } from "@tiptap/react";

import { StyledButton } from "../StyledButton";

interface Props {
  editor: Editor;
}

const ItalicButton = ({ editor }: Props) => {
  return (
    <StyledButton
      className={editor.isActive("italic") ? "botao-ativo" : ""}
      onClick={() => editor.chain().focus().toggleItalic().run()}
      startIcon={<FormatItalicIcon />}
      variant={editor.isActive("italic") ? "contained" : "outlined"}
    >
      Itálico
    </StyledButton>
  );
};

export { ItalicButton };
