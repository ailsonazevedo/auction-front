import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import * as React from "react";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        opacity: 1,
      },
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff",
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      color: "#fff",
      transform: "translateX(22px)",
    },
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
  },
  "& .MuiSwitch-thumb": {
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff",
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      content: "''",
      height: "100%",
      left: 0,
      position: "absolute",
      top: 0,
      width: "100%",
    },
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    height: 32,
    width: 32,
  },
  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
    opacity: 1,
  },
  height: 34,
  padding: 7,
  width: 62,
}));

const Android12Switch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    height: 16,
    margin: 2,
    width: 16,
  },
  "& .MuiSwitch-track": {
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::before, &::after": {
      content: '""',
      height: 16,
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
    },
    borderRadius: 22 / 2,
  },
  padding: 8,
}));

interface IOSSwitchProps {
  checked?: any;
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch disableRipple focusVisibleClassName=".Mui-focusVisible" {...props} />
))(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        border: 0,
        opacity: 1,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
      color: "#fff",
      transform: "translateX(16px)",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      border: "6px solid #fff",
      color: "#33cf4d",
    },
    margin: 2,
    padding: 0,
    transitionDuration: "300ms",
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    height: 18,
    width: 20,
  },
  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    borderRadius: 26 / 2,
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
  height: 22,
  padding: 0,
  width: 40,
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        opacity: 1,
      },
      color: "#fff",
      transform: "translateX(12px)",
    },
    padding: 2,
  },
  "& .MuiSwitch-thumb": {
    borderRadius: 6,
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    height: 12,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
    width: 12,
  },
  "& .MuiSwitch-track": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    borderRadius: 16 / 2,
    boxSizing: "border-box",
    opacity: 1,
  },
  "&:active": {
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
    "& .MuiSwitch-thumb": {
      width: 15,
    },
  },
  display: "flex",
  height: 16,
  padding: 0,
  width: 28,
}));

export { Android12Switch, AntSwitch, IOSSwitch, MaterialUISwitch };
