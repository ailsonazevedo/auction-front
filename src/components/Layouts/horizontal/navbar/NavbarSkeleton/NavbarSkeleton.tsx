import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const NavbarSkeleton = () => {
  const arraySkeleton = ["skeleton1", "skeleton2", "skeleton3", "skeleton4"];
  return (
    <Stack direction={"row"} justifyContent={"center"} px={2} spacing={2}>
      {arraySkeleton.map((skeleton) => (
        <Skeleton
          height={42}
          key={skeleton}
          variant="rounded"
          width={"187px"}
        />
      ))}
    </Stack>
  );
};

export { NavbarSkeleton };
