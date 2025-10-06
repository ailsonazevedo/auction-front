import { Editor } from "@tiptap/react";

import { StyledButton } from "../StyledButton";

interface Props {
  align: "center" | "justify" | "left" | "right";
  editor: Editor;
  label: string;
}

const TextAlignButton = ({ align, editor, label }: Props) => {
  return (
    <StyledButton
      className={editor.isActive({ textAlign: align }) ? "botao-ativo" : ""}
      onClick={() => editor.chain().focus().setTextAlign(align).run()}
      variant={editor.isActive({ textAlign: align }) ? "contained" : "outlined"}
    >
      {label}
    </StyledButton>
  );
};

export { TextAlignButton };
