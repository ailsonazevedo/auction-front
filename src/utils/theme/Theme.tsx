import { useThemeStore } from "@/stores/themeStore/theme-store";
import * as locales from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
import _ from "lodash";

import components from "./Components";
import { DarkThemeColors } from "./DarkThemeColors";
import { baseDarkTheme, baselightTheme } from "./DefaultColors";
import { LightThemeColors } from "./LightThemeColors";
import { shadows } from "./Shadows";
import typography from "./Typography";

export const BuildTheme = (config: any = {}) => {
  const { darkTheme } = useThemeStore();
  const themeColors = darkTheme ? DarkThemeColors : LightThemeColors;
  const themeOptions = themeColors.find((theme) => theme.name === "BLUE_THEME");

  const defaultTheme = darkTheme ? baseDarkTheme : baselightTheme;
  const defaultShadow = shadows;
  const themeSelect = themeOptions;
  const baseMode = {
    palette: {
      mode: "light",
    },
    shadows: defaultShadow,
    shape: {
      borderRadius: 7,
    },
    typography: typography,
  };
  const theme = createTheme(
    _.merge({}, baseMode, defaultTheme, locales, themeSelect, {
      direction: config.direction,
    }),
  );
  theme.components = components(theme);

  return theme;
};

const ThemeSettings = () => {
  const activDir = "ltr";
  const activeTheme = "BLUE_THEME";
  const theme = BuildTheme({
    direction: activDir,
    theme: activeTheme,
  });

  return theme;
};

export { ThemeSettings };
