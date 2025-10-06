import Box from "@mui/material/Box";
import { Stack } from "@mui/system";

import { NavListing } from "./NavListing/NavListing";

const Navbar = () => {
  return (
    <Box
      bgcolor={"background.paper"}
      border={"1px solid rgba(0,0,0,0.05)"}
      display={"flex"}
      mt={2}
      position={"relative"}
    >
      <Stack alignItems={"center"} direction="row" mx={"auto"}>
        <NavListing />
      </Stack>
    </Box>
  );
};

export { Navbar };
