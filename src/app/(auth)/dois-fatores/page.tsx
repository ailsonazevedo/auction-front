"use client";
import { AuthTwoStepsForm } from "@/components/auth/Forms/AuthTwoStepsForm";
import { Box, Card, Grid, Skeleton, Typography } from "@mui/material";
import { Suspense } from "react";

const boxStyle = {
  "&:before": {
    animation: "gradient 15s ease infinite",
    background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
    backgroundSize: "400% 400%",
    content: '""',
    height: "100%",
    opacity: "0.3",
    position: "absolute",
    width: "100%",
  },
  position: "relative",
};

const cardStyle = { maxWidth: "450px", p: 4, width: "100%", zIndex: 1 };

export default function TwoSteps() {
  return (
    <Box sx={boxStyle}>
      <Grid
        container
        justifyContent="center"
        spacing={0}
        sx={{ height: "100vh" }}
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
          <Card elevation={9} sx={cardStyle}>
            <Box>
              <Box alignItems="center" display="flex" justifyContent="center">
                {/* <Logo /> */}
              </Box>
              <Typography
                color="textSecondary"
                mb={1}
                textAlign="center"
                variant="subtitle1"
              >
                Para concluir o login, verifique o seu aplicativo de
                autenticação.
              </Typography>
            </Box>
            <Suspense
              fallback={
                <Skeleton height="200px" variant="rounded" width="100%" />
              }
            >
              <AuthTwoStepsForm />
            </Suspense>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

TwoSteps.layout = "Blank";
