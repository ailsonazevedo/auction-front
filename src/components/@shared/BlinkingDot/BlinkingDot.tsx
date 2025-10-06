import { Box, styled } from "@mui/material";
import React from "react";

const BlinkingDot = () => {
  const FlickerButton = styled(Box)(() => ({
    "@keyframes flicker": {
      from: {
        opacity: 0.9,
      },
      to: {
        opacity: 0.6,
      },
    },
    animationDirection: "alternate",
    animationDuration: "800ms",
    animationIterationCount: "infinite",
    animationName: "flicker",
    animationPlayState: "running",
    animationTimingFunction: "ease-in-out",
    backgroundColor: "green",
    borderRadius: "50%",
    boxShadow: "0 0 5px darkgreen",
    height: "10px",
    width: "10px",
  }));

  return (
    <>
      <FlickerButton color="primary" />
    </>
  );
};

export { BlinkingDot };
