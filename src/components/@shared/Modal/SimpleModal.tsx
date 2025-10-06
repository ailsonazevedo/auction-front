import useClearParams from "@/hooks/@shared/useClearParams";
import { Close } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  Modal,
  ModalProps,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import "simplebar-react/dist/simplebar.min.css";

interface Props extends Omit<ModalProps, "children"> {
  children: React.ReactNode;
  containerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  disableClearParams?: boolean;
  disableIconClose?: boolean;
  maxHeight?: number | string;
  minHeight?: number | string;
  modalCloseInClickBackPage?: boolean;
  onClose?: () => void;
  open: boolean;
  title?: string;
  width?: { lg: string; md: string; sm: string; xs: string } | number | string;
}

const SimpleModal = ({
  children,
  containerStyle,
  contentStyle,
  disableClearParams = false,
  disableIconClose = false,
  maxHeight = "90vh",
  minHeight = "0vh",
  modalCloseInClickBackPage = false, // Nova prop
  onClose,
  open,
  title,
  width,
  ...rest
}: Props) => {
  const clearParams = useClearParams();
  const style = {
    bgcolor: "background.paper",
    borderRadius: 0.7,
    boxShadow: 24,
    left: "50%",
    minWidth: width ?? { lg: "45vw", md: "55vw", sm: "60vw", xs: "90vw" },
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: width ?? { lg: "25vw", md: "35vw", sm: "45vw", xs: "90vw" },
    ...containerStyle,
  };

  const handleClearParams = () => {
    clearParams();
  };

  return (
    <Modal
      aria-describedby="modal-description"
      aria-labelledby="modal-title"
      onClose={(event, reason) => {
        if (modalCloseInClickBackPage && reason === "backdropClick") {
          return;
        }
        onClose?.();
        if (!disableClearParams) handleClearParams();
      }}
      open={open}
      {...rest}
    >
      <Box sx={{ ...style, width: width ?? style.minWidth }}>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          p=".5rem 1rem 0px 1rem"
        >
          <Typography
            component="h2"
            id="modal-title"
            sx={{
              fontWeight: "bold",
            }}
            variant="h4"
          >
            {title}
          </Typography>
          {!disableIconClose && (
            <IconButton onClick={onClose ?? handleClearParams}>
              <Close />
            </IconButton>
          )}
        </Box>
        <Divider sx={{ marginTop: 1 }} />
        <Box
          id="modal-description"
          sx={{
            ...contentStyle,
            maxHeight: `calc(${maxHeight} - 2rem)`,
            overflow: "auto",
            padding: "0rem 1rem 0rem 1rem",
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export { SimpleModal };
