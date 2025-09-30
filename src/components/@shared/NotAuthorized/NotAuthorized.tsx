import BlockIcon from "@mui/icons-material/Block";
import { Box, Button, Typography } from "@mui/material";

const boxStyle = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  gap: 1,
  justifyContent: "center",
  marginTop: "4rem",
  textAlign: "center",
};

const NotAuthorized = () => {
  return (
    <Box sx={boxStyle}>
      <BlockIcon sx={{ color: "tomato", fontSize: 100 }} />
      <Typography variant="h3">Você não está autorizado</Typography>
      <Typography sx={{ maxWidth: "500px", width: "100%" }}>
        Parece que você não tem permissão para acessar esta página. Tente entrar
        com uma conta diferente ou fazer o login novamente.
      </Typography>
      <Button color="primary" href="/" variant="contained">
        Voltar a tela inicial
      </Button>
    </Box>
  );
};

export { NotAuthorized };
