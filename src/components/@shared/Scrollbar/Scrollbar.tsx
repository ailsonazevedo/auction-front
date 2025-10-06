"use client";
import { styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const SimpleBarStyle = styled(SimpleBar)(() => ({
  maxHeight: "100%",
}));

interface PropsType {
  children: React.ReactElement | React.ReactNode;
  sx: SxProps;
}

const Scrollbar = (props: PropsType) => {
  const { children, sx, ...other } = props;

  return (
    <SimpleBarStyle sx={sx} {...other}>
      {children}
    </SimpleBarStyle>
  );
};

export default Scrollbar;
