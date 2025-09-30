import { WrapperLogin } from "@/components/auth/Wrappers/WrapperLogin/WrapperLogin";
import { Box, Card, Grid, Skeleton } from "@mui/material";
import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Entrar",
};

const cardStyle = { maxWidth: "450px", p: 4, zIndex: 1 };

export default async function Login() {
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
          px={1}
          sm={12}
          xl={4}
          xs={12}
        >
          <Card elevation={9} sx={cardStyle}>
            <Box alignItems="center" display="flex" justifyContent="center">
              {/* <Logo /> */}
            </Box>
            <Suspense
              fallback={<Skeleton height={250} variant="rectangular" />}
            >
              <WrapperLogin />
            </Suspense>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

Login.layout = "Blank";
