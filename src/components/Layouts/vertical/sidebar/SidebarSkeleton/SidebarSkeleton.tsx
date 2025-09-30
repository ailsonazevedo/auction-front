import { Skeleton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const uniqueKeys = Array.from(
  { length: 20 },
  (_, index) => `skeleton-${index}`,
);

const SidebarSkeleton = () => {
  return (
    <Box pt={2} sx={{ height: "90vh", overflow: "hidden" }}>
      <Stack px={2} spacing={2}>
        {uniqueKeys.map((key) => (
          <Skeleton height={40} key={key} variant="rounded" width={"100%"} />
        ))}
      </Stack>
    </Box>
  );
};

export { SidebarSkeleton };
