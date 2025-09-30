"use client";

import AuthLoginForm from "@/components/auth/Forms/LoginForm";
import { Box, Skeleton } from "@mui/material";
import { Suspense } from "react";

function WrapperLogin() {
  return (
    <Suspense fallback={<Skeleton height={250} variant="rectangular" />}>
      <Box alignItems="center" display="flex" justifyContent="center">
        <img alt="logo" height={60} src={"/images/logo-teresina-varejao.png"} />
      </Box>
      <AuthLoginForm />
    </Suspense>
  );
}

export { WrapperLogin };
