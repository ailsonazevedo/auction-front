"use theme";
import { useThemeStore } from "@/stores/themeStore/theme-store";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";

const TogleTheme = () => {
  const themeStore = useThemeStore();
  const handleThemeColor = () => {
    themeStore.toggleTheme();
  };
  return (
    <IconButton onClick={handleThemeColor} sx={{ ml: 1 }}>
      <Tooltip title={themeStore.darkTheme ? "Tema claro" : "Tema escuro"}>
        {themeStore.darkTheme ? (
          <Brightness7 sx={{ color: "#fff" }} />
        ) : (
          <Brightness4 />
        )}
      </Tooltip>
    </IconButton>
  );
};

export { TogleTheme };
