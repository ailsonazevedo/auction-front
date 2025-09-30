"use client";
import AuthForgotPasswordForm from "@/components/auth/Forms/ForgotPassowordForm";
import { Box, Card, Grid, Skeleton } from "@mui/material";
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

export default function ForgotPassword() {
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
          lg={4}
          sm={12}
          xl={3}
          xs={12}
        >
          <Card
            elevation={9}
            sx={{ maxWidth: "500px", p: 4, width: "100%", zIndex: 1 }}
          >
            <Box alignItems="center" display="flex" justifyContent="center">
              {/* <Logo /> */}
            </Box>

            <Suspense
              fallback={
                <Skeleton height="200px" variant="rounded" width="100%" />
              }
            >
              <AuthForgotPasswordForm />
            </Suspense>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

ForgotPassword.layout = "Blank";
