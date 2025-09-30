"use client";
import { Stack } from "@mui/system";
import React from "react";

import { Profile } from "../Profile/Profile";

const RightSideHeader = () => {
  return (
    <Stack alignItems="center" direction="row" spacing={1}>
      <Profile />
    </Stack>
  );
};

export { RightSideHeader };
