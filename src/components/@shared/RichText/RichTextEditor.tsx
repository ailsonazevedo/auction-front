"use client";

import { Card, Divider, Skeleton, Typography, styled } from "@mui/material";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FormikProps } from "formik";
import React, { useEffect } from "react";

import { MenuBar } from "./MenuBar";

const StyledEditorContent = styled(EditorContent)`
  .ProseMirror:focus {
    outline: none;
  }
  .ProseMirror {
    height: 250px;
    width: 100%;
  }
`;

const StyledViewContent = styled(EditorContent)`
  .ProseMirror:focus {
    outline: none;
  }
  .ProseMirror {
    height: auto;
    width: 100%;
  }
`;

type EditableProps = {
  formikAndName: { formik: FormikProps<any>; name: string };
  onlyView?: false;
};

type ViewOnlyProps = {
  conteudo: string;
  onlyView: true;
};

// Props condicionais:
// Se a props onlyView for true, é requerido somente a prop content
// Se a props onlyView for false, é requerido a prop content e a setContent
type Props = EditableProps | ViewOnlyProps;

const RichTextEditor = (props: Props) => {
  const initialContent = props.onlyView
    ? props.conteudo
    : (props.formikAndName.formik.values[props.formikAndName.name] as string);
  const editor = useEditor({
    content: initialContent,
    editable: !props.onlyView,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    immediatelyRender: true,

    onBlur: () => {
      if (!props.onlyView) {
        props.formikAndName.formik.setFieldValue(
          props.formikAndName.name,
          editor.getHTML(),
        );
      }
    },
  });

  // Preencher automaticamente em caso de ja vir dado da api em ao editar
  useEffect(() => {
    if (!props.onlyView && editor) {
      const newContent = props.formikAndName.formik.values[
        props.formikAndName.name
      ] as string;
      editor.commands.setContent(newContent);
    }
  }, [
    !props.onlyView &&
      props.formikAndName.formik.values[props.formikAndName.name],
    editor,
  ]);

  if (!editor) {
    return <Skeleton height={150} variant="rectangular" />;
  }

  if (props.onlyView) {
    return <StyledViewContent data-testid="editor-view" editor={editor} />;
  }

  return (
    <Card>
      <MenuBar editor={editor} />
      <Divider sx={{ my: 1 }} />
      <StyledEditorContent data-testid="editor-edit" editor={editor} />
      {props.formikAndName.formik.touched[props.formikAndName.name] && (
        <Typography color={"red"}>
          {props.formikAndName.formik.errors[
            props.formikAndName.name
          ]?.toString()}
        </Typography>
      )}
    </Card>
  );
};

export { RichTextEditor };
