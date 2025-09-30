import { Stack } from "@mui/system";
import { Editor } from "@tiptap/react";

import { BoldButton } from "./Controls/BoldButton";
import { HeadingButton } from "./Controls/HeadingButton";
import { HighlightButton } from "./Controls/HighlightButton";
import { ItalicButton } from "./Controls/ItalicButton";
import { ParagraphButton } from "./Controls/ParagraphButton";
import { StrikeButton } from "./Controls/StrikeButton";
import { TextAlignButton } from "./Controls/TextAlignButton";

interface Props {
  editor: Editor;
}
const MenuBar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <Stack direction="row" flexWrap={"wrap"} gap={1}>
      <HeadingButton editor={editor} level={1}>
        H1
      </HeadingButton>
      <HeadingButton editor={editor} level={2}>
        H2
      </HeadingButton>
      <HeadingButton editor={editor} level={3}>
        H3
      </HeadingButton>
      <ParagraphButton editor={editor} />
      <BoldButton editor={editor} />
      <ItalicButton editor={editor} />
      <StrikeButton editor={editor} />
      <HighlightButton editor={editor} />
      <TextAlignButton align={"center"} editor={editor} label="Centro" />
      <TextAlignButton align={"right"} editor={editor} label="Direita" />
      <TextAlignButton align={"left"} editor={editor} label="Esquerda" />
      <TextAlignButton align={"justify"} editor={editor} label="Ajustar" />
    </Stack>
  );
};

export { MenuBar };
