"use client";
import { useSidebarStore } from "@/utils/providers/SidebarStoreProvider";
import { Box, useMediaQuery } from "@mui/material";
import React from "react";

const PageWrapper = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { isCollapse, miniSidebar } = useSidebarStore((state) => state);
  const smallScreen = useMediaQuery("(max-width:1199px)");

  return (
    <Box
      sx={{
        backgroundColor: "backgroundColor.default",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: "space-between",
        minWidth: 0,
        ml: isCollapse && !smallScreen ? `${miniSidebar}px` : undefined,
        paddingBottom: "5px",
        width: "100%",
        zIndex: 1,
      }}
    >
      {children}
    </Box>
  );
};

export { PageWrapper };
