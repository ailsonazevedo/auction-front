"use client";

import { logout } from "@/actions/logout";
import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithRealod";
import { useGetInfoLoggedUser } from "@/hooks/user/useGet/useGetInfoLoggedUser";
import { applyTextLimiter } from "@/utils/functions/@shared/textLimitter";
import { useSidebarStore } from "@/utils/providers/SidebarStoreProvider";
import {
  Avatar,
  Box,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { IconLogout } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import secureLocalStorage from "react-secure-storage";

const Profile = () => {
  const { isCollapse, isSidebarHover } = useSidebarStore((state) => state);
  const { data: UserResult, isError, isSuccess } = useGetInfoLoggedUser();
  const QueryClient = useQueryClient();
  const handleLogout = async () => {
    await logout();
    secureLocalStorage.clear();
    QueryClient.removeQueries();
  };

  const hasProfilePhoto =
    isSuccess && UserResult ? UserResult.profilePhoto : "";

  if (isError) {
    return (
      <AlertErrorWithReload invalidateQuery={["admin", "users", "logged"]} />
    );
  }

  return (
    <Box
      alignItems="center"
      display={"flex"}
      gap={2}
      sx={{
        backgroundColor: "#fff",
        borderRadius: 1,
        m: 2,
        p: !isCollapse || isSidebarHover ? 2 : 0,
      }}
    >
      {!isCollapse || isSidebarHover ? (
        <>
          <Avatar
            alt="Remy Sharp"
            src={hasProfilePhoto}
            sx={{ height: 40, width: 40 }}
          />
          <Box>
            <Tooltip placement="top" title={UserResult?.name ?? "Loading..."}>
              <Typography color={"#021C11"} variant="h6">
                {UserResult?.name ? (
                  applyTextLimiter(UserResult?.name, 8)
                ) : (
                  <Stack>
                    <Skeleton height={"25px"} width={"80px"} />{" "}
                    <Skeleton height={"15px"} width={"80px"} />{" "}
                  </Stack>
                )}
              </Typography>
            </Tooltip>
            <Tooltip placement="top" title={UserResult?.email ?? ""}>
              <Typography color={"#021C11"} variant="caption">
                {UserResult?.email && applyTextLimiter(UserResult?.email, 10)}
              </Typography>
            </Tooltip>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip placement="top" title="Sair da conta">
              <IconButton
                aria-label="botão para deslogar"
                data-testid="logout-button"
                onClick={handleLogout}
                size="small"
                sx={{ color: "black" }}
              >
                {/* <IconPower data-testid="logout-icon" size="20" /> */}
                <IconLogout
                  color={"#021C11"}
                  data-testid="logout-icon"
                  size="20"
                />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        <Box margin={"0 auto"}>
          <IconButton
            aria-label="botão para deslogar"
            data-testid="logout-button"
            onClick={handleLogout}
            size="small"
            sx={{ color: "black" }}
          >
            {/* <IconPower data-testid="logout-icon" /> */}
            <IconLogout color={"#021C11"} data-testid="logout-icon" size="20" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export { Profile };
