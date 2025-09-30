"use client";

import { useNavigateWithFilters } from "@/hooks/@shared/useNavigateWithFilters";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";

interface Props {
  href: string;
}

const BackButtonArrow = ({ href }: Props) => {
  const { navigateBack } = useNavigateWithFilters();

  return (
    <Tooltip title="Voltar á pagina anterior">
      <IconButton onClick={() => navigateBack(href)}>
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  );
};

export { BackButtonArrow };
