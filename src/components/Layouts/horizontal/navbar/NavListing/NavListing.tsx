"use client";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import {
  AbilityContext,
  AbilityStatusContext,
} from "@/utils/providers/AbilityProvider";
import { AnyAbility } from "@casl/ability";
import { List, Skeleton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";

import { MenuItems } from "../MenuItems";
import { NavCollapse } from "../NavCollapse/NavCollapse";
import { NavItem } from "../NavItem/NavItem";

const checkPermissions = (arrPerms: string[], ability: AnyAbility): boolean => {
  if (!Array.isArray(arrPerms) || !arrPerms) {
    return false;
  }

  if (ability.can("manage", "all")) {
    return true;
  }

  return arrPerms.some((perm) => {
    const [subject, actionType] = perm.split(":");
    return ability.can(actionType, subject);
  });
};
const NavListing = () => {
  const contextAbility = useContext(AbilityContext);
  const { isError: isErrorPolicies, isLoading: isLoadingPolicies } =
    useContext(AbilityStatusContext);

  if (isLoadingPolicies) {
    return (
      <Box>
        <Stack direction={"row"} overflow={"hidden"} spacing={2}>
          <Skeleton height={45} sx={{ width: { sm: 140, xs: 100 } }} />
          <Skeleton height={45} sx={{ width: { sm: 140, xs: 100 } }} />
          <Skeleton height={45} sx={{ width: { sm: 140, xs: 100 } }} />
        </Stack>
      </Box>
    );
  }

  if (isErrorPolicies) {
    return (
      <Box mt={4}>
        <AlertErrorWithReload invalidateQuery={["admin", "policies", "me"]} />
      </Box>
    );
  }
  const filteredData = MenuItems.filter((item) =>
    checkPermissions(item.actions, contextAbility),
  );

  const hideMenu: any = false;
  return (
    <Box gap={2}>
      <List
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "3px",
          justifyContent: "center",
          p: 0,
          zIndex: "100",
        }}
      >
        {filteredData.map((item) => {
          if (item.children) {
            return (
              <NavCollapse
                hideMenu={hideMenu}
                key={item.id}
                level={1}
                menu={item}
              />
            );
            // ********If Sub No Menu**********
          }
          if (!item.children && item.href) {
            return <NavItem item={item} key={item.id} level={1} />;
          }
        })}
      </List>
    </Box>
  );
};

export { NavListing };
