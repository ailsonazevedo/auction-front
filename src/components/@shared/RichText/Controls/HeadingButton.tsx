import { Level } from "@tiptap/extension-heading";
import { Editor } from "@tiptap/react";

import { StyledButton } from "../StyledButton";

interface Props {
  children: React.ReactNode;
  editor: Editor;
  level: Level;
}

const HeadingButton = ({ children, editor, level }: Props) => {
  return (
    <StyledButton
      className={editor.isActive("heading", { level }) ? "botao-ativo" : ""}
      onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
      variant={editor.isActive("heading", { level }) ? "contained" : "outlined"}
    >
      {children}
    </StyledButton>
  );
};

export { HeadingButton };
