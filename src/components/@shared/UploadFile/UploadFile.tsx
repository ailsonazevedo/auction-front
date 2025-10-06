"use client";

import { UPLOAD_PORTFOLIOS } from "@/services/apiService/endpoints/portfolio";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

/**
 * Props for the UploadFile component.
 *
 * @typedef {Object} UploadFileProps
 * @property {string} [acceptedTypes='*'] - Accepted file types as a MIME type string (e.g., "image/png,image/jpeg").
 * @property {number} [maxSizeMB=10] - Maximum file size allowed in megabytes (default is 10MB).
 * @property {boolean} disabled - If the input should be disabled.
 */

interface UploadFileProps {
  acceptedTypes?: string;
  disabled?: boolean;
  maxSizeMB?: number;
  onError?: (error: any, file?: File) => void;
  onStart?: (file: File) => void;
  onSuccess?: (response: any, file: File) => void;
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
 * @property {boolean} disabled - If the input should be disabled.
 *
 * @returns {JSX.Element} The rendered component.
 */
const UploadFile = ({
  acceptedTypes = "*/*",
  disabled,
  maxSizeMB = 10,
  onError,
  onStart,
  onSuccess,
  sizeStyle = "medium",
}: UploadFileProps) => {
  const theme = useTheme();
  const [file, setFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const isDisabled = Boolean(disabled || isUploading);

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

    const acceptedTypesArray = acceptedTypes.split(",").map((t) => t.trim());
    if (
      acceptedTypes !== "*/*" &&
      !acceptedTypesArray.includes(selectedFile.type)
    ) {
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

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /**
   * Submits the selected file to the server and shows a toast message with the result.
   *
   * @param {File} fileToUpload - The file to upload.
   */
  const handleFileSubmit = async (fileToUpload: File) => {
    setIsUploading(true);
    onStart?.(fileToUpload);
    const formData = new FormData();
    formData.append("file", fileToUpload);

    try {
      const result = await UPLOAD_PORTFOLIOS.upload(formData);
      if (result.status === 202) {
        toast.success("Upload realizado com sucesso");
        onSuccess?.(result, fileToUpload);
      } else {
        toast.error("Erro ao fazer upload do arquivo.");
        onError?.(result, fileToUpload);
      }
    } catch (error) {
      toast.error("Erro ao processar o upload.");
      onError?.(error, fileToUpload);
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Reverts the file upload by clearing the selected file.
   */
  const handleRevertUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(undefined);
  };

  const currentStyles = styles(sizeStyle);
  return (
    <Stack gap={2} justifyContent="center" textAlign="center">
      <DropZone
        aria-label="Selecionar arquivo para upload"
        onClick={() => {
          if (isDisabled) return;
          fileInputRef.current?.click();
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!isDisabled) fileInputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
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
                <Tooltip title={file.name}>
                  <Typography sx={{ cursor: "default" }}>
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
      <VisuallyHiddenInput
        accept={acceptedTypes}
        disabled={isDisabled}
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
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
  "&:hover": { backgroundColor: theme.palette.action.hover },
  backgroundColor: theme.palette.background.default,
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  padding: theme.spacing(2.5),
  textAlign: "center",
}));

export { UploadFile };
