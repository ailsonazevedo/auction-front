import ReplayIcon from "@mui/icons-material/Replay";
import { Alert, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

type Prop = number | string;
const AlertErrorWithReload = ({
  invalidateQuery,
}: {
  invalidateQuery: Prop[];
}) => {
  const queryClient = useQueryClient();

  const retryRequest = () => {
    queryClient.invalidateQueries({ queryKey: invalidateQuery });
  };

  return (
    <Alert
      severity="error"
      sx={{
        marginBottom: "10px",
      }}
    >
      <Box sx={{ alignItems: "center", display: "flex", flexWrap: "wrap" }}>
        <Typography color="error" variant="h6">
          Erro ao carregar dados
        </Typography>
        <Button
          onClick={() => retryRequest()}
          startIcon={<ReplayIcon />}
          sx={{ marginX: "10px" }}
          variant="outlined"
        >
          {"  "}
          Recarregar
        </Button>
      </Box>
    </Alert>
  );
};

export { AlertErrorWithReload };
