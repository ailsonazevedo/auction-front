import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const LoadingSkeletonModal = () => {
  return (
    <Stack justifyContent={"center"}>
      <Skeleton height={60} width={"100%"} />
      <Skeleton height={60} width={"100%"} />
      <Skeleton height={60} width={"100%"} />
    </Stack>
  );
};

export { LoadingSkeletonModal };
