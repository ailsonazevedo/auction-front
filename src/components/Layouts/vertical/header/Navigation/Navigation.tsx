"use client";
import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import Link from "next/link";

const Navigation = () => {
  const largeScreen = useMediaQuery("(min-width:1200px)");
  const isLoggedIn = true;

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction={!largeScreen ? "column" : "row"} spacing={1}>
        <Button
          color="inherit"
          component={Link}
          href="/carteiras"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            px: { sm: 1.5, xs: 1 },
          }}
          variant="text"
        >
          Carteiras
        </Button>
        {!isLoggedIn && (
          <Button
            aria-label="Login"
            color="inherit"
            href="/entrar"
            sx={{
              color: (theme) => theme.palette.text.secondary,
              minWidth: 0,
              px: { sm: 1, xs: 0.5 },
            }}
          >
            Login
          </Button>
        )}
      </Stack>
    </Box>
  );
};
export { Navigation };
