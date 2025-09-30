"use client";

import { uploadImage } from "@/services/apiUploadImagem/endpoints/uploadImagem";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  CircularProgress,
  FormHelperText,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

/**
 * Props for the UploadFile component.
 *
 * @typedef {Object} UploadFileProps
 * @property {string} [acceptedTypes='*'] - Accepted file types as a MIME type string (e.g., "image/png,image/jpeg").
 * @property {number} [maxSizeMB=10] - Maximum file size allowed in megabytes (default is 10MB).
 * @property {Object} formikAndName - Object containing Formik props and the field name.
 * @property {FormikProps<any>} formikAndName.formik - Formik instance.
 * @property {string} formikAndName.name - The name of the field in the Formik form.
 * @property {boolean} disabled - If the input should be disabled.
 * @property {boolean} customError - If true, the error message will be displayed even if there is no validation error.
 * @property {string} [customHelperText] - Custom helper text to display below the input.
 */

interface UploadFileProps {
  acceptedTypes?: string;
  customError?: boolean;
  customHelperText?: string;
  disabled?: boolean;
  formikAndName: { formik: FormikProps<any>; name: string };
  maxSizeMB?: number;
  sizeStyle?: "medium" | "small";
}

const styles = (sizeStyle: "medium" | "small") => {
  const icon = {
    medium: 40,
    small: 20,
  };
  return {
    icon: icon[sizeStyle],
  };
};
/**
 * Component that handles file uploads with drag-and-drop or file input.
 * It validates file types, size, and handles the upload via an API.
 *
 * @param {UploadFileProps} props - The component props.
 * @property {string} [acceptedTypes='*'] - Accepted file types as a MIME type string (e.g., "image/png,image/jpeg").
 * @property {number} [maxSizeMB=10] - Maximum file size allowed in megabytes (default is 10MB).
 * @property {Object} formikAndName - Object containing Formik props and the field name.
 * @property {FormikProps<any>} formikAndName.formik - Formik instance.
 * @property {string} formikAndName.name - The name of the field in the Formik form.
 * @property {string} sizeStyle - The size style of the component (small or medium).
 * @property {boolean} disabled - If the input should be disabled.
 * @property {boolean} customError - If true, the error message will be displayed even if there is no validation error.
 * @property {string} [customHelperText] - Custom helper text to display below the input.
 *
 * @returns {JSX.Element} The rendered component.
 */
const UploadFile = ({
  acceptedTypes = "*/*",
  customError,
  customHelperText,
  disabled,
  formikAndName,
  maxSizeMB = 10,
  sizeStyle = "medium",
}: UploadFileProps) => {
  const theme = useTheme();
  const { formik, name } = formikAndName;
  const [file, setFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { error } = formik.getFieldMeta(name);

  const uniqueId = useRef(
    `fileInput-${Math.random().toString(36).substring(2, 11)}-${name}`,
  ).current;

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const isError = Boolean(error || customError);
  const helperTextError = String(error || customHelperText);
  const isDisabled = Boolean(disabled || isUploading);

  useEffect(() => {
    const documentUrl = formik.values[name];
    if (documentUrl) {
      const fileName = documentUrl.split("/").pop() || "file";
      const file = new File([], fileName, { type: "application/pdf" });
      setFile(file);
    }
  }, [formik.values[name]]);

  /**
   * Handles the drop event by preventing the default behavior and calling the handleFile function.
   *
   * @param {React.DragEvent<HTMLDivElement>} event - The drop event.
   */
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files?.[0] || null;
    handleFile(selectedFile);
  };

  /**
   * Handles the selected file by validating it and initiating the upload.
   *
   * @param {File | null} selectedFile - The file selected by the user.
   */
  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    const acceptedTypesArray = acceptedTypes.split(",");
    if (!acceptedTypesArray.includes(selectedFile.type)) {
      toast.error(
        `Tipo de arquivo não permitido. Tipos aceitos: ${acceptedTypes}`,
        {
          duration: 2000,
        },
      );
      return;
    }

    if (selectedFile.size > maxSizeBytes) {
      toast.error(`O arquivo é muito grande. Máx permitido: ${maxSizeMB}MB.`, {
        duration: 2000,
      });
      return;
    }

    setFile(selectedFile);
    handleFileSubmit(selectedFile);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Submits the selected file to the server and updates the Formik field with the uploaded file URL.
   *
   * @param {File} fileToUpload - The file to upload.
   */
  const handleFileSubmit = async (fileToUpload: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("files", fileToUpload);

    try {
      const result = await uploadImage.getLinkImage(formData);
      if (result.status === 201) {
        const fileUrl = result.data[0]?.url;
        formik.setFieldValue(name, fileUrl);
        setFile(fileToUpload);
      } else {
        toast.error("Erro ao fazer upload do arquivo.");
      }
    } catch (error) {
      toast.error("Erro ao processar o upload.");
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Reverts the file upload by clearing the selected file and the Formik field value.
   */
  const handleRevertUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(undefined);
    formik.setFieldValue(name, "");
  };

  const currentStyles = styles(sizeStyle);
  return (
    <Stack gap={2} justifyContent="center" textAlign="center">
      <DropZone
        onClick={() => {
          formik.setFieldTouched(name, true);
          document.getElementById(uniqueId)?.click();
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          borderColor:
            isError && formik.touched[name]
              ? theme.palette.error.main
              : theme.palette.divider,
        }}
        theme={theme}
      >
        {isUploading ? (
          <>
            <CircularProgress />
            <Typography>Enviando arquivo...</Typography>
          </>
        ) : (
          <>
            <CloudUploadIcon
              sx={{
                color: theme.palette.text.secondary,
                fontSize: currentStyles.icon,
              }}
            />
            {file ? (
              <Stack alignItems="center" spacing={1}>
                <Tooltip title="Visualizar arquivo">
                  <Typography
                    onClick={() => window.open(formik.values[name], "_blank")}
                    sx={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {file.name.length > 30
                      ? file.name.slice(0, 30) + "..."
                      : file.name}
                  </Typography>
                </Tooltip>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Tooltip title="Remover arquivo">
                    <IconButton
                      disabled={isDisabled}
                      onClick={handleRevertUpload}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            ) : (
              <Typography>
                Arraste e solte um arquivo aqui ou clique para selecionar
              </Typography>
            )}
          </>
        )}
      </DropZone>
      {isError && formik.touched[name] && (
        <FormHelperText error>{helperTextError}</FormHelperText>
      )}
      <VisuallyHiddenInput
        accept={acceptedTypes}
        disabled={isDisabled}
        id={uniqueId}
        onChange={(e) => handleFile(e.target.files ? e.target.files[0] : null)}
        ref={fileInputRef}
        type="file"
      />
    </Stack>
  );
};

const VisuallyHiddenInput = styled("input")({
  bottom: 0,
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  left: 0,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const DropZone = styled(Box)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  backgroundColor: theme.palette.background.default,
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  padding: theme.spacing(2.5),
  textAlign: "center",
}));

export { UploadFile };
