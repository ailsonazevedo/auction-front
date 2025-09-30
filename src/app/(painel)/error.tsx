"use client";

import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";

export default function ErrorPage(
  props: Readonly<{
    error: { digest?: string } & Error;
    reset: () => void;
  }>,
) {
  const { error, reset } = props;

  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <Box mt={2}>
      <Box textAlign={"center"}>
        <Box mb={1}>
          <Typography variant="h3">Algo deu errado!</Typography>
          <Typography variant="body1">
            Um inesperado erro ocorreu. Por favor, tente novamente.
          </Typography>
        </Box>
        <Box>
          <Button onClick={() => reset()} variant="contained">
            Tentar novamente
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
