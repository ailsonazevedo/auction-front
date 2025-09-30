"use client";
import { useNavigateWithFilters } from "@/hooks/@shared/useNavigateWithFilters";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import { Button, CircularProgress, StackProps, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import { FormikProps } from "formik";
import { useRouter } from "nextjs-toploader/app";
import { JSX, useEffect, useState } from "react";
interface ModalProps {
  handleCancelClick: () => void;
}

interface NewPageProps {
  urlToBack: string;
}
export type StatusResponse = "default" | "error" | "pending" | "success";
type ButtonColor = "error" | "primary" | "success" | "warning";

interface CommonProps {
  additionalButton?: JSX.Element | null;
  buttonStyleDefault?: boolean;
  buttonText?: string;
  cancelButtonText?: string;
  colorButonProps?: ButtonColor;
  data_qa?: string;
  disabled?: boolean;

  disabledSubmit?: boolean;
  edit?: string;
  formik: FormikProps<any>;
  hideCancelButton?: boolean;
  hideConfirmButton?: boolean;
  justifyContent?: "center" | "end" | "space-between" | "start";
  onClickProp?: () => void;
  props?: StackProps;
  sendIcon?: JSX.Element;
  statusRequestSend?: StatusResponse;
  tooltipTitle?: string;
  type: "modal" | "newPage";
  varaintButton?: "contained" | "outlined" | "text";
}
// Union dos tipos
type Props = CommonProps & (ModalProps | NewPageProps);

const SubmitButtons = ({
  additionalButton,
  buttonStyleDefault = true,
  buttonText = "Salvar",
  cancelButtonText = "Cancelar",
  colorButonProps,
  data_qa = "",
  disabled,
  disabledSubmit = false,
  edit,
  formik,
  hideCancelButton = false,
  hideConfirmButton = false,
  justifyContent = "end",
  onClickProp,
  sendIcon = <> </>,
  statusRequestSend = "default",
  tooltipTitle,
  type,
  varaintButton = "contained",
  ...props
}: Props) => {
  const router = useRouter();
  const { navigateBack } = useNavigateWithFilters();

  const handleCancel = () => {
    if (type === "modal") {
      const { handleCancelClick } = props as ModalProps;
      handleCancelClick();
    } else if (type === "newPage") {
      const { urlToBack } = props as NewPageProps;
      navigateBack(urlToBack);
    }
  };
  const [currentStatus, setCurrentStatus] = useState<StatusResponse>(
    statusRequestSend ?? "default",
  );

  useEffect(() => {
    if (statusRequestSend) {
      setCurrentStatus(statusRequestSend);
      const timeout = setTimeout(() => {
        setCurrentStatus("default");
      }, 2000);
      return () => clearTimeout(timeout);
    } else {
      setCurrentStatus("default");
    }
  }, [statusRequestSend]);
  useEffect(() => {
    setCurrentStatus("default");
  }, []);

  const getControlStatus = (status: StatusResponse) => {
    const controlStatus: Record<
      StatusResponse,
      { IconButton: JSX.Element; colorButton: ButtonColor; textSubmit?: string }
    > = {
      default: {
        IconButton: sendIcon,
        colorButton: "primary",
        textSubmit: formik.isSubmitting ? "Salvando" : buttonText,
      },
      error: {
        IconButton: <ErrorIcon />,
        colorButton: "error",
        textSubmit: "Erro!",
      },
      pending: {
        IconButton: <CircularProgress size={20} />,
        colorButton: "warning",
      },
      success: {
        IconButton: <CheckIcon />,
        colorButton: "success",
        textSubmit: "Sucesso!",
      },
    };

    return controlStatus[status] || controlStatus.default;
  };
  const { IconButton, colorButton, textSubmit } =
    getControlStatus(currentStatus);
  const disabledButton =
    currentStatus === "pending" ||
    formik?.isSubmitting ||
    disabled ||
    disabledSubmit;
  const typeButton =
    currentStatus === "error" || currentStatus === "success"
      ? undefined
      : "submit";
  const actionPropButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClickProp) {
      e.preventDefault();
      onClickProp();
    }
  };
  const buttonStyle = () => {
    const defaultStyleButtons = {
      direction: "row",
      mt: 2,
      spacing: 2,
    };
    if (buttonStyleDefault) {
      return defaultStyleButtons;
    } else {
      return {};
    }
  };
  return (
    <Stack justifyContent={justifyContent} {...buttonStyle()}>
      {!hideCancelButton && (
        <span>
          <Button
            color={additionalButton ? "secondary" : "error"}
            data-qa={`cancel-button-${data_qa}`}
            disabled={disabled || formik.isSubmitting}
            onClick={handleCancel}
            sx={{
              minHeight: "30px",
              minWidth: "100px",
            }}
            variant={varaintButton}
          >
            {cancelButtonText}
          </Button>
        </span>
      )}
      {additionalButton && <span>{additionalButton}</span>}
      {!hideConfirmButton && (
        <Tooltip
          disableHoverListener={formik.dirty}
          placement="top"
          title={tooltipTitle ?? ""}
        >
          <span>
            <span>
              <Button
                color={colorButton}
                data-qa={`submit-button-${data_qa}`}
                disabled={disabledButton}
                endIcon={IconButton}
                onClick={(e) => actionPropButton(e)}
                sx={{ minHeight: "30px", minWidth: "100px" }}
                type={typeButton ?? "submit"}
                variant={varaintButton}
              >
                {textSubmit}
              </Button>
            </span>
          </span>
        </Tooltip>
      )}
    </Stack>
  );
};

export { SubmitButtons };
