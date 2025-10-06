import { IconButton, Tooltip } from "@mui/material";
import React from "react";

import { IOSSwitch } from "../Switch/Switch";

interface Props {
  disabled?: boolean;
  onClick?: () => void;
  value: boolean;
}

const CustomBooleanField = ({ disabled, onClick, value }: Props) => {
  return (
    <Tooltip placement="top" title={value ? "Desativar" : "Ativar"}>
      <IconButton onClick={onClick} sx={{ padding: 0 }}>
        <IOSSwitch checked={value} disabled={disabled} />
      </IconButton>
    </Tooltip>
  );
};

export { CustomBooleanField };
