import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/system";
import React, { ReactNode, useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
}));

interface Props {
  children: ReactNode;
  color?: string;
  dialogProps?: Partial<DialogProps>;
  fullWidth?: boolean;
  itemOpen: ReactNode;
  openDialog?: boolean;
  title: string;
}

const SimpleDialog = ({
  children,
  color,
  dialogProps,
  fullWidth = true,
  itemOpen,
  openDialog,
  title,
}: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState<boolean>(openDialog || false);

  const itemOpenWithClick = React.cloneElement(itemOpen as React.ReactElement, {
    onClick: () => {
      setOpen(true);
    },
  });

  return (
    <>
      {itemOpenWithClick}
      <BootstrapDialog
        {...dialogProps}
        fullScreen={fullScreen}
        fullWidth={fullWidth}
        onClose={() => setOpen(false)}
        open={open}
      >
        <DialogTitle color={color}>{title}</DialogTitle>
        <IconButton
          aria-label="close"
          data-testid="icon-close"
          onClick={() => setOpen(false)}
          sx={{
            color: (theme) => theme.palette.grey[500],
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ mx: 1 }}>{children}</DialogContent>
      </BootstrapDialog>
    </>
  );
};

export { SimpleDialog };
