import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <Stack justifyContent={"center"} sx={{ padding: "20px" }}>
      <Stack width={"100%"}>
        <Skeleton height={50} width={"100%"} />
        <Skeleton height={50} width={"100%"} />
        <Skeleton height={50} width={"100%"} />
        <Skeleton height={50} width={"100%"} />
        <Skeleton height={50} width={"100%"} />
        <Skeleton height={50} width={"100%"} />
        <Skeleton height={50} width={"100%"} />
        <Skeleton height={50} width={"100%"} />
        <Skeleton height={50} width={"100%"} />
      </Stack>
    </Stack>
  );
};

export default LoadingSkeleton;
