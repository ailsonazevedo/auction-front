"use client";
import { AbilityContext } from "@/utils/providers/AbilityProvider";
import { Box } from "@mui/material";
import { useContext } from "react";

const WrapperBids = () => {
  const ability = useContext(AbilityContext);
  return (
    <Box>
      {ability.can("view_own_bid_history", "all") ? (
        <p>Você tem permissão para ver esta seção.</p>
      ) : (
        <p>Você não tem permissão para ver esta seção.</p>
      )}
    </Box>
  );
};

export { WrapperBids };
