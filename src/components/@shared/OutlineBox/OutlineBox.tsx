import { useThemeStore } from "@/stores/themeStore/theme-store";
import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface OutlineBoxProps {
  children: ReactNode;
  label: string;
}

const OutlineBox: React.FC<OutlineBoxProps> = ({ children, label }) => {
  const themeStore = useThemeStore();
  const isDarkMode = themeStore.darkTheme;

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? "#2C3346" : "white",
        border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.23)" : "rgba(0, 0, 0, 0.23)"}`,
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginTop: "24px",
        padding: "16px",
        paddingTop: "24px",
        position: "relative",
      }}
    >
      <Typography
        sx={{
          backgroundColor: isDarkMode ? "#2C3346" : "white",
          color: "text.secondary",
          left: "12px",
          paddingX: "4px",
          position: "absolute",
          top: 0,
          transform: "translateY(-50%)",
        }}
        variant="caption"
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
};

export default OutlineBox;
