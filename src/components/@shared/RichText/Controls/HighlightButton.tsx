import { Editor } from "@tiptap/react";

import { StyledButton } from "../StyledButton";

interface Props {
  editor: Editor;
}

const HighlightButton = ({ editor }: Props) => {
  return (
    <StyledButton
      className={editor.isActive("highlight") ? "botao-ativo" : ""}
      onClick={() => editor.chain().focus().toggleHighlight().run()}
      variant={editor.isActive("highlight") ? "contained" : "outlined"}
    >
      Marcado
    </StyledButton>
  );
};

export { HighlightButton };
