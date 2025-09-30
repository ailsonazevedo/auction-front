import { Editor } from "@tiptap/react";

import { StyledButton } from "../StyledButton";

interface Props {
  editor: Editor;
}

const ParagraphButton = ({ editor }: Props) => {
  return (
    <StyledButton
      className={editor.isActive("paragraph") ? "botao-ativo" : ""}
      onClick={() => editor.chain().focus().setParagraph().run()}
      variant={editor.isActive("paragraph") ? "contained" : "outlined"}
    >
      Parágrafo
    </StyledButton>
  );
};

export { ParagraphButton };
