import { Box, Button, Popover, Typography } from "@mui/material";
import React from "react";

const idPopover = {
  click: "Pop-up simples ao clicar",
  hover: "Pop-up ao passar o mouse",
};
interface Props {
  anchorHorizontal?: "left" | "right";
  anchorVertical?: "bottom" | "top";
  children: React.ReactNode;
  text: string;
  type: "click" | "hover";
}
const SimplePopover = ({
  anchorHorizontal = "left",
  anchorVertical = "bottom",
  children,
  text,
  type,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? idPopover[type] : undefined;

  return (
    <>
      {type === "click" && (
        <Button
          aria-describedby={id}
          onClick={handlePopoverOpen}
          variant="contained"
        >
          {text}
        </Button>
      )}
      {type === "hover" && (
        <Typography
          aria-haspopup="true"
          aria-owns={open ? "Pop-up ao passar o mouse" : undefined}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {text}
        </Typography>
      )}
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: anchorHorizontal,
          vertical: anchorVertical,
        }}
        id="mouse-over-popover"
        onClose={handlePopoverClose}
        open={open}
        sx={{
          pointerEvents: type === "click" ? "initial" : "none",
        }}
        transformOrigin={
          type === "hover"
            ? {
                horizontal: "left",
                vertical: "top",
              }
            : undefined
        }
      >
        <Box p={2}>{children}</Box>
      </Popover>
    </>
  );
};
export default SimplePopover;
