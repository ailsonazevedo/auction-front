"use client";
import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import Link from "next/link";

const Navigation = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isLoggedIn = true;

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction={isMobile ? "column" : "row"} spacing={1}>
        <Button
          color="inherit"
          component={Link}
          href="/"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            px: { sm: 1.5, xs: 1 },
          }}
          variant="text"
        >
          Início
        </Button>
        <Button
          color="inherit"
          component={Link}
          href="/meus-lances"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            px: { sm: 1.5, xs: 1 },
          }}
          variant="text"
        >
          Meus Lances
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
