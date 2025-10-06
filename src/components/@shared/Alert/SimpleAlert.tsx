import { Alert, AlertTitle } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  severity?: "error" | "info" | "success" | "warning";
  title: string;
  variant?: "filled" | "outlined" | "standard";
}

const SimpleAlert = ({
  children,
  severity = "success",
  title,
  variant = "standard",
  ...rest
}: Props) => {
  return (
    <Alert severity={severity} variant={variant} {...rest}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );
};

export { SimpleAlert };
