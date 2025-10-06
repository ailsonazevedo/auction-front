"use client";
import Logo from "@/components/@shared/Logo/Logo";
import AuthRegisterForm from "@/components/auth/Forms/RegisterForm";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";

const boxStyle = {
  "&:before": {
    animation: "gradient 15s ease infinite",
    background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
    backgroundSize: "400% 400%",
    content: '""',
    minHeight: "100%",
    opacity: "0.3",
    position: "absolute",
    width: "100%",
  },
  position: "relative",
};

export default function Register() {
  return (
    <Box sx={boxStyle}>
      <Grid
        container
        justifyContent="center"
        spacing={0}
        sx={{ minHeight: "100vh" }}
      >
        <Grid
          alignItems="center"
          display="flex"
          item
          justifyContent="center"
          lg={5}
          sm={12}
          xl={4}
          xs={12}
        >
          <Card
            elevation={9}
            sx={{
              marginBottom: "40px",
              marginTop: "40px",
              maxWidth: "450px",
              p: 4,
              width: "100%",
              zIndex: 1,
            }}
          >
            <Box alignItems="center" display="flex" justifyContent="center">
              <Logo />
            </Box>
            <AuthRegisterForm />
            <Stack direction="row" justifyContent={"center"} mt={3} spacing={1}>
              <Typography color="textSecondary" fontWeight="400" variant="h6">
                Já tem uma conta?
              </Typography>
              <Typography
                component={Link}
                fontWeight="500"
                href="/entrar"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                }}
              >
                Entrar
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

Register.layout = "Blank";
