"use client";
import { ADMIN_PERMISSIONS, USER_PERMISSIONS } from "@/constants/permissions";
import { Can } from "@/utils/providers/AbilityProvider";
import {
  AccountBalanceWallet,
  Home,
  LocalOffer,
  PointOfSale,
} from "@mui/icons-material";
import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import Link from "next/link";

const Navigation = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box display="flex" flexDirection="column">
      <Stack direction={isMobile ? "column" : "row"} spacing={1}>
        <Button
          color="inherit"
          component={Link}
          href="/"
          startIcon={<Home />}
          sx={{
            color: (theme) => theme.palette.text.secondary,
            px: { sm: 1.5, xs: 1 },
          }}
          variant="text"
        >
          Início
        </Button>
        <Can I={ADMIN_PERMISSIONS.CREATE_PORTFOLIO} a={"all"}>
          <Button
            color="inherit"
            component={Link}
            href="/carteiras"
            startIcon={<AccountBalanceWallet />}
            sx={{
              color: (theme) => theme.palette.text.secondary,
              px: { sm: 1.5, xs: 1 },
            }}
            variant="text"
          >
            Carteiras
          </Button>
        </Can>
        <Can I={USER_PERMISSIONS.VIEW_OWN_BID_HISTORY} a={"all"}>
          <Button
            color="inherit"
            component={Link}
            href="/lances"
            startIcon={<LocalOffer />}
            sx={{
              color: (theme) => theme.palette.text.secondary,
              px: { sm: 1.5, xs: 1 },
            }}
            variant="text"
          >
            Lances
          </Button>
        </Can>
        <Can I={ADMIN_PERMISSIONS.CREATE_AUCTION} a={"all"}>
          <Button
            color="inherit"
            component={Link}
            href="/gerenciar-leiloes"
            startIcon={<PointOfSale />}
            sx={{
              color: (theme) => theme.palette.text.secondary,
              px: { sm: 1.5, xs: 1 },
            }}
            variant="text"
          >
            Gerenciar Leilões
          </Button>
        </Can>
      </Stack>
    </Box>
  );
};
export { Navigation };
