import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

const LoadingSelectText = () => {
  return (
    <Box display={"flex"} gap={2}>
      <Typography>Carregando dados...</Typography>
      <CircularProgress size={20} />
    </Box>
  );
};

export { LoadingSelectText };
