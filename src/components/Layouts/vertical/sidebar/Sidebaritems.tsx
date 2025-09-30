"use client";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import {
  AbilityContext,
  AbilityStatusContext,
} from "@/utils/providers/AbilityProvider";
import { useSidebarStore } from "@/utils/providers/SidebarStoreProvider";
import { AnyAbility } from "@casl/ability";
import { List, Skeleton, Stack } from "@mui/material";
import { Box, useMediaQuery } from "@mui/system";
import { usePathname } from "next/navigation";
import { useContext } from "react";

import { MenuitemsType } from "./MenuItems";
import NavCollapse from "./NavCollapse/NavCollapse";
import NavGroup from "./NavGroup/NavGroup";
import NavItem from "./NavItem/NavItem";

interface Props {
  data: MenuitemsType[];
}

const SidebarItemsSkeleton = () => (
  <Stack mt={1} p={3} spacing={1}>
    {Array.from({ length: 13 })
      .fill(null)
      .map((_, index) => (
        <Skeleton
          height={45}
          key={index + "-skeleton"}
          sx={{ bgcolor: "rgb(250, 250, 250, 0.1)" }}
          variant="rounded"
          width="100%"
        />
      ))}
  </Stack>
);

export const checkPermissions = (
  arrPerms: string[],
  ability: AnyAbility,
  notActions?: string[],
): boolean => {
  if (!Array.isArray(arrPerms) || !arrPerms) {
    return false;
  }

  if (ability.can("manage", "all")) {
    return true;
  }

  if (notActions && notActions.length > 0) {
    const hasBlockedPermission = notActions.some((notAction) => {
      const [subject, actionType] = notAction.split(":");
      return ability.can(actionType, subject);
    });

    if (hasBlockedPermission) {
      return false;
    }
  }

  return arrPerms.some((perm) => {
    const [subject, actionType] = perm.split(":");

    return ability.can(actionType, subject);
  });
};

const SidebarItems = ({ data }: Props) => {
  const largeScreen = useMediaQuery("(min-width:1200px)");
  const { isCollapse, isSidebarHover } = useSidebarStore((state) => state);
  const contextAbility = useContext(AbilityContext);
  const { isError: isErrorPolicies, isLoading: isLoadingPolicies } =
    useContext(AbilityStatusContext);
  const ability = contextAbility;
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const hideMenu = isCollapse && !isSidebarHover && largeScreen;

  if (isLoadingPolicies) {
    return <SidebarItemsSkeleton />;
  }

  if (isErrorPolicies) {
    return (
      <Box mt={4}>
        <AlertErrorWithReload invalidateQuery={["admin", "policies", "me"]} />
      </Box>
    );
  }
  const filterMenuByPermissions = (
    menu: MenuitemsType[],
    ability: AnyAbility,
  ): MenuitemsType[] => {
    return menu
      .map((item) => {
        if (item.children) {
          return {
            ...item,
            children: filterMenuByPermissions(item.children, ability),
          };
        }
        return item;
      })
      .filter((item) =>
        checkPermissions(item.actions!, ability, item.notActions || []),
      );
  };

  const filteredData = filterMenuByPermissions(data, ability);

  return (
    <Box sx={{ pt: 1, px: 1 }}>
      <List className="sidebarNav" sx={{ pt: 0 }}>
        {filteredData.map((item) => {
          if (item.subheader) {
            return (
              <NavGroup
                hideMenu={hideMenu}
                isAdmin={isAdmin}
                item={item}
                key={item.subheader}
              />
            );
          } else if (item.children) {
            return (
              <NavCollapse
                hideMenu={hideMenu}
                isAdmin={isAdmin}
                key={item.id}
                level={1}
                menu={item}
              />
            );
          } else {
            return (
              <NavItem
                hideMenu={hideMenu}
                isAdmin={isAdmin}
                item={item}
                key={item.id}
                level={1}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};

export { SidebarItems };
