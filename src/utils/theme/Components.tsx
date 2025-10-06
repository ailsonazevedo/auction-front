// project imports
import { Theme } from "@mui/material/styles";

import "./DefaultColors";

const components: any = (theme: Theme) => {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          ":before": {
            backgroundColor: theme.palette.grey[100],
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        filledError: {
          color: "white",
        },
        filledInfo: {
          color: "white",
        },
        filledSuccess: {
          color: "white",
        },
        filledWarning: {
          color: "white",
        },
        outlinedError: {
          borderColor: theme.palette.error.main,
          color: theme.palette.error.main,
        },
        outlinedInfo: {
          borderColor: theme.palette.info.main,
          color: theme.palette.info.main,
        },
        outlinedSuccess: {
          borderColor: theme.palette.success.main,
          color: theme.palette.success.main,
        },
        outlinedWarning: {
          borderColor: theme.palette.warning.main,
          color: theme.palette.warning.main,
        },
        standardError: {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.main,
        },
        standardInfo: {
          backgroundColor: theme.palette.info.light,
          color: theme.palette.info.main,
        },
        standardSuccess: {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.main,
        },
        standardWarning: {
          backgroundColor: theme.palette.warning.light,
          color: theme.palette.warning.main,
        },
        successIcon: {
          color: theme.palette.info.main,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedError: {
          "&:hover": {
            backgroundColor: theme.palette.error.main,
            color: "white",
          },
          backgroundColor: theme.palette.user.button.bgError,
        },
        // botao principal para ações de salvar/criar
        containedPrimary: {
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "white",
          },
          backgroundColor: theme.palette.user.button.bg,
        },
        outlinedError: {
          "&:hover": {
            backgroundColor: theme.palette.error.main,
            color: "white",
          },
        },
        outlinedInfo: {
          "&:hover": {
            backgroundColor: theme.palette.info.main,
            color: "white",
          },
        },
        outlinedPrimary: {
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "white",
          },
        },
        outlinedSecondary: {
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: "white",
          },
        },
        outlinedSuccess: {
          "&:hover": {
            backgroundColor: theme.palette.success.main,
            color: "white",
          },
        },
        outlinedWarning: {
          "&:hover": {
            backgroundColor: theme.palette.warning.main,
            color: "white",
          },
        },
        root: {
          boxShadow: "none",
          textTransform: "none",
        },
        text: {
          padding: "5px 15px",
        },
        textError: {
          "&:hover": {
            backgroundColor: theme.palette.error.main,
            color: "white",
          },
          backgroundColor: theme.palette.error.light,
        },
        textInfo: {
          "&:hover": {
            backgroundColor: theme.palette.info.main,
            color: "white",
          },
          backgroundColor: theme.palette.info.light,
        },
        textPrimary: {
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "white",
          },
          backgroundColor: theme.palette.primary.light,
        },
        textSecondary: {
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: "white",
          },
          backgroundColor: theme.palette.secondary.light,
        },
        textSuccess: {
          "&:hover": {
            backgroundColor: theme.palette.success.main,
            color: "white",
          },
          backgroundColor: theme.palette.success.light,
        },
        textWarning: {
          "&:hover": {
            backgroundColor: theme.palette.warning.main,
            color: "white",
          },
          backgroundColor: theme.palette.warning.light,
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          padding: "15px",
          width: "100%",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
        },
        title: {
          fontSize: "1.125rem",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          fontWeight: 600,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        " .simplebar-scrollbar:before": {
          background: `${theme.palette.grey[300]} !important`,
        },
        "#root": {
          height: "100%",
        },
        "*": {
          boxSizing: "border-box",
        },
        "*[dir='rtl'] .buyNowImg": {
          transform: "scaleX(-1)",
        },
        ".MuiAlert-root .MuiAlert-icon": {
          color: "inherit!important",
        },
        ".MuiCardHeader-action": {
          alignSelf: "center !important",
        },
        ".MuiTimelineConnector-root": {
          width: "1px !important",
        },
        ".border-none": {
          border: "0px",
          td: {
            border: "0px",
          },
        },
        ".btn-xs": {
          borderRadius: "6px !important",
          height: "30px",
          minWidth: "30px !important",
          padding: "0px !important",
          width: "30px",
        },
        ".emoji-picker-react .emoji-scroll-wrapper": {
          overflowX: "hidden",
        },
        ".hover-text-primary:hover .text-hover": {
          color: theme.palette.primary.main,
        },
        ".hoverCard:hover": {
          scale: "1.01",
          transition: " 0.1s ease-in",
        },
        ".rounded-bars .apexcharts-bar-series.apexcharts-plot-series .apexcharts-series path":
          {
            clipPath: "inset(0 0 5% 0 round 20px)",
          },
        ".scrollbar-container": {
          borderRight: "0 !important",
        },
        ".signup-bg": {
          height: "100%",
          position: "absolute",
          right: 0,
          top: 0,
        },
        ".theme-timeline .MuiTimelineOppositeContent-root": {
          minWidth: "90px",
        },
        "@keyframes gradient": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: " 100% 50%",
          },
          "100% ": {
            backgroundPosition: " 0% 50%",
          },
        },
        a: {
          textDecoration: "none",
        },
        body: {
          height: "100%",
          margin: 0,
          padding: 0,
        },
        html: {
          height: "100%",
          width: "100%",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.25rem",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.divider,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderColor: `${theme.palette.divider}`,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
        sizeSmall: {
          height: 30,
          minHeight: 30,
          width: 30,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
        },
      },
    },
    MuiGridItem: {
      styleOverrides: {
        root: {
          paddingLeft: "30px !important",
          paddingTop: "30px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[200],
          borderRadius: "6px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "12px 14px",
        },
        inputSizeSmall: {
          padding: "8px 14px",
        },
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[200]
                : theme.palette.grey[300],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.grey[300],
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // border: `1px solid ${theme.palette.divider}`,
          backgroundImage: "none",
        },
      },
    },

    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow:
            "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "inherit",
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: theme.palette.divider,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-child td": {
            borderBottom: 0,
          },
        },
      },
    },
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.divider,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: theme.palette.text.primary,
          color: theme.palette.background.paper,
        },
      },
    },
  };
};
export default components;
