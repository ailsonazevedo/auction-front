import { Drawer, DrawerProps, SxProps, Theme } from "@mui/material";
import React from "react";

const styleSx: SxProps<Theme> = {
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: { md: "30%", sm: "40%", xs: "80%" },
  },
};

const SimpleDrawer = (props: DrawerProps) => {
  const { children, sx, ...otherProps } = props;
  return (
    <Drawer sx={sx ?? styleSx} {...otherProps}>
      {children}
    </Drawer>
  );
};

export { SimpleDrawer };
