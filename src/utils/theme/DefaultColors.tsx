const baselightTheme = {
  direction: "ltr",
  palette: {
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hover: "#f6f9fc",
      hoverOpacity: 0.02,
    },
    admin: {
      breadcrumb: {
        bg: "#12374C",
        // bg: "#D9D9D9",
        borderColor: "#12374C",
        // borderColor: "#E0E0E0",
        subtitle: "#fff",
        title: "#fff",
        // subtitle: "#021C11",
        // title: "#021C11"
      },
      header: {
        bg: "#12374C",
        color: "#fff",
      },
      sidebar: {
        bg: "#001229",
        hover: "#12374C",
        light: "#F5F5DC",
        main: "#3a539c",
      },
    },
    backgroundColor: {
      dark: "#F3F3F9",
      default: "#f8f8f8",
      paper: "#3a539c",
    },
    divider: "#e5eaef",
    error: {
      contrastText: "#ffffff",
      dark: "#f3704d",
      light: "#FDEDE8",
      main: "#FA896B",
    },
    grey: {
      100: "#F2F6FA",
      200: "#EAEFF4",
      300: "#DFE5EF",
      400: "#7C8FAC",
      500: "#5A6A85",
      600: "#2A3547",
    },
    info: {
      contrastText: "#ffffff",
      dark: "#1682d4",
      light: "#EBF3FE",
      main: "#539BFF",
    },
    primary: {
      dark: "#4570EA",
      light: "#ECF2FF",
      main: "#5D87FF",
    },
    purple: {
      A50: "#EBF3FE",
      A100: "#6610f2",
      A200: "#557fb9",
    },
    richText: {
      button: {
        borderColor: "#ccc",
        color: "#000",
        hover: "#dddddd",
      },
    },
    secondary: {
      dark: "#23afdb",
      light: "#E8F7FF",
      main: "#49BEFF",
    },
    success: {
      contrastText: "#ffffff",
      dark: "#02b3a9",
      light: "#E6FFFA",
      main: "#13DEB9",
    },
    text: {
      primary: "#2A3547",
      secondary: "#2A3547",
    },
    user: {
      breadcrumb: {
        bg: "#FD5426",
        // bg: "#D9D9D9",
        borderColor: "#FD5426",
        // borderColor: "#E0E0E0",
        subtitle: "#fff",
        title: "#fff",
        // subtitle: "#021C11",
        // title: "#021C11"
      },
      button: {
        bg: "#3a539c",
        bgError: "#CE2323",
      },
      dashboard: {
        bgCardGreen: "#E6FFFA",
        bgCardRed: "#FBF2EF",
        iconColorGreen: "#3DDAB4",
        iconColorRed: "#CE2323",
        textColorGreen: "#3DDAB4",
        textColorRed: "#FA896B",
      },
      header: {
        bg: "#FFF",
        color: "#fff",
      },
      navBar: {
        text: "#3a539c",
      },
      sidebar: {
        bg: "#021C11",
        hover: "#288F64",
        light: "#fff",
        main: "#fff",
      },
    },
    warning: {
      contrastText: "#ffffff",
      dark: "#ae8e59",
      light: "#FEF5E5",
      main: "#FFAE1F",
    },
  },
};

const baseDarkTheme = {
  direction: "ltr",
  palette: {
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hover: "#333F55",
      hoverOpacity: 0.02,
    },
    admin: {
      breadcrumb: {
        bg: "#12374C",
        borderColor: "rgba(237, 247, 255, 0.1)",
        subtitle: "#fff",
        title: "#fff",
      },
      header: {
        bg: "#12374C",
        color: "#fff",
      },
      sidebar: {
        // bg: "#05142B",
        bg: "#001229",
        hover: "rgba(237, 247, 255, 0.5)",
        light: "#E8F7FF",
        main: "#253662",
      },
    },
    backgroundColor: {
      // dark: "#171c23",
      dark: "#2C3346",
      default: "#2C3346",
      // default: "#001229",
      paper: "#171c23",
    },
    divider: "#333F55",
    error: {
      contrastText: "#ffffff",
      dark: "#f3704d",
      light: "#4B313D",
      main: "#FA896B",
    },
    grey: {
      100: "#333F55",
      200: "#465670",
      300: "#7C8FAC",
      400: "#DFE5EF",
      500: "#EAEFF4",
      600: "#F2F6FA",
    },
    info: {
      contrastText: "#ffffff",
      dark: "#1682d4",
      light: "#223662",
      main: "#539BFF",
    },
    primary: {
      dark: "#4570EA",
      light: "#ECF2FF",
      main: "#5D87FF",
    },
    purple: {
      A50: "#EBF3FE",
      A100: "#6610f2",
      A200: "#557fb9",
    },
    richText: {
      button: {
        borderColor: "#ccc",
        color: "#fff",
        hover: "#dddddd",
      },
    },
    secondary: {
      dark: "#173f98",
      light: "#1C455D",
      main: "#777e89",
    },
    success: {
      contrastText: "#ffffff",
      dark: "#02b3a9",
      light: "#1B3C48",
      main: "#13DEB9",
    },
    text: {
      primary: "#EAEFF4",
      secondary: "#7C8FAC",
    },
    user: {
      breadcrumb: {
        bg: "#001229",
        borderColor: "#001229",
        subtitle: "#fff",
        title: "#fff",
      },
      button: {
        bg: "#3a539c",
        bgError: "#CE2323",
      },
      dashboard: {
        bgCardGreen: "#338070",
        bgCardRed: "#7A3F2B",
        iconColorGreen: "#465954",
        iconColorRed: "#4F3535",
        textColorGreen: "#465954",
        textColorRed: "#7A6E6A",
      },
      header: {
        bg: "#05142B",
        // bg: "#001229",
        color: "#fff",
      },
      navBar: {
        text: "#fff",
      },
      sidebar: {
        bg: "#05142B",
        // bg: "#001229",
        hover: "rgba(237, 247, 255, 0.5)",
        light: "#E8F7FF",
        main: "#3a539c",
      },
    },
    warning: {
      contrastText: "#ffffff",
      dark: "#ae8e59",
      light: "#4D3A2A",
      main: "#FFAE1F",
    },
  },
};

export { baseDarkTheme, baselightTheme };

declare module "@mui/material/styles" {
  interface Palette {
    admin: {
      breadcrumb: {
        bg: string;
        text: string;
      };
      sidebar: {
        hover: string;
        light: string;
        main: string;
      };
    };
    richText: {
      button: {
        borderColor: string;
        color: string;
        hover: string;
      };
    };
    user: {
      breadcrumb: {
        bg: string;
        text: string;
      };
      button: {
        bg: string;
        bgError: string;
      };
      dashboard: {
        bgCardGreen: string;
        bgCardRed: string;
        iconColorGreen: string;
        iconColorRed: string;
        textColorGreen: string;
        textColorRed: string;
      };
      header: {
        bg: string;
        color: string;
      };
      navBar: {
        text: string;
      };
      sidebar: {
        bg: string;
        hover: string;
        light: string;
        main: string;
      };
    };
  }
}
