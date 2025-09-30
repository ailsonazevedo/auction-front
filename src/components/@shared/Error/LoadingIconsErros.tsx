import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

interface Props {
  invalidateQuery: string[];
}

const LoadingIconsErros = ({ invalidateQuery }: Props) => {
  const queryClient = useQueryClient();

  const retryRequest = () => {
    queryClient.invalidateQueries({ queryKey: invalidateQuery });
  };

  return (
    <Tooltip title="Recarregar dados">
      <IconButton
        onClick={() => retryRequest()}
        size="small"
        sx={{ height: 17 }}
      >
        <ReplayIcon color="error" fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export { LoadingIconsErros };
