"use client";
import { useSidebarStore } from "@/utils/providers/SidebarStoreProvider";
import { IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconMenu2 } from "@tabler/icons-react";
import React from "react";

const TogleSidebar = () => {
  const largeScreen = useMediaQuery("(min-width:1200px)");
  const { toggleCollapseBar, toggleMobileBar } = useSidebarStore(
    (state) => state,
  );
  const theme = useTheme();
  const handelCollapseBar = () => {
    toggleCollapseBar();
  };
  const handleMobileBar = () => {
    toggleMobileBar();
  };

  return (
    <IconButton
      aria-label="menu"
      onClick={largeScreen ? handelCollapseBar : handleMobileBar}
      sx={{ color: theme.palette.user.header.color }}
    >
      <IconMenu2 size="20" />
    </IconButton>
  );
};

export { TogleSidebar };
