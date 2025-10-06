import Logo from "@/components/@shared/Logo/Logo";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box
      component="footer"
      sx={{
        alignItems: "center",
        borderTop: "1px solid #b5aeae",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: 300,
        mt: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          justifyContent: "space-evenly",
          py: 2,
          width: "100%",
        }}
      >
        <Box sx={{ py: 2, width: { md: 220, sm: 200, xs: 180 } }}>
          <Logo />
        </Box>

        <Stack alignItems={{ md: "flex-start", xs: "center" }} spacing={1}>
          <Link href="#">Suporte</Link>
          <Link href="#">Fale Conosco</Link>
          <Link href="#">Termos de uso e política de privacidade</Link>
        </Stack>
      </Box>

      <Box sx={{ py: 2 }}>
        <Typography align="center" fontStyle="italic" variant="body2">
          Leilão de carteiras, Todos os direitos reservados - {year}
        </Typography>
      </Box>
    </Box>
  );
};

export { Footer };
