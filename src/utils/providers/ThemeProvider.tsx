"use client";

import { ThemeSettings } from "@/utils/theme/Theme";
import { ThemeProvider } from "@mui/material";

const ClientThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = ThemeSettings();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ClientThemeProvider;
