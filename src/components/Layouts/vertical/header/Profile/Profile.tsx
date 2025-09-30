"use client";
import { logout } from "@/actions/logout";
import { useGetInfoLoggedUser } from "@/hooks/user/useGet/useGetInfoLoggedUser";
import { applyTextLimiter } from "@/utils/functions/@shared/textLimitter";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Menu,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { IconMail } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import secureLocalStorage from "react-secure-storage";

import { profile } from "../MenuData";
import { TogleTheme } from "../TogleTheme/TogleTheme";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const QueryClient = useQueryClient();

  const { data: UserResult, isSuccess } = useGetInfoLoggedUser();

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleLogout = async () => {
    await logout();
    secureLocalStorage.removeItem("USER");
    QueryClient.removeQueries();
  };

  const hasProfilePhoto =
    isSuccess && UserResult ? UserResult.profilePhoto : "";
  return (
    <Box>
      <IconButton
        aria-controls="msgs-menu"
        aria-haspopup="true"
        aria-label="show 11 new notifications"
        color="inherit"
        onClick={handleClick2}
        size="large"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
      >
        <Avatar
          alt={"ProfileImg"}
          src={hasProfilePhoto}
          sx={{
            height: 35,
            width: 35,
          }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        id="msgs-menu"
        keepMounted
        onClose={handleClose2}
        open={Boolean(anchorEl2)}
        sx={{
          "& .MuiMenu-paper": {
            p: 4,
            width: "360px",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          justifyContent={"space-between"}
          spacing={1}
        >
          <Typography variant="h5">Perfil do usuário</Typography>
          <TogleTheme />
        </Stack>
        <Stack alignItems="center" direction="row" py={3} spacing={2}>
          <Avatar
            alt={"ProfileImg"}
            src={hasProfilePhoto}
            sx={{ height: 95, width: 95 }}
          />
          <Box>
            <Tooltip title={UserResult?.name ?? ""}>
              <Typography
                color="textPrimary"
                fontWeight={600}
                variant="subtitle2"
              >
                {applyTextLimiter(UserResult?.name ?? "", 15)}
              </Typography>
            </Tooltip>
            <Tooltip title={UserResult?.email ?? ""}>
              <Typography
                alignItems="center"
                color="textSecondary"
                display="flex"
                gap={1}
                variant="subtitle2"
              >
                <IconMail height={15} width={15} />
                {UserResult?.email ? (
                  applyTextLimiter(UserResult.email, 15)
                ) : (
                  <CircularProgress size={30} />
                )}
              </Typography>
            </Tooltip>
          </Box>
        </Stack>

        <Divider />
        {profile.map((profile) => (
          <Box key={profile.title}>
            <Box className="hover-text-primary" sx={{ px: 0, py: 2 }}>
              <Link
                href={profile.href}
                onClick={() => setAnchorEl2(null)}
                style={{ textDecoration: "none" }}
              >
                <Stack direction="row" spacing={2}>
                  <Box
                    alignItems="center"
                    bgcolor="primary.light"
                    display="flex"
                    flexShrink="0"
                    height="45px"
                    justifyContent="center"
                    width="45px"
                  >
                    <Avatar
                      alt={profile.icon}
                      src={UserResult?.profilePhoto}
                      sx={{
                        borderRadius: 0,
                        height: 24,
                        width: 24,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      className="text-hover"
                      color="textPrimary"
                      fontWeight={600}
                      noWrap
                      sx={{
                        width: "240px",
                      }}
                      variant="subtitle2"
                    >
                      {profile.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      noWrap
                      sx={{
                        width: "240px",
                      }}
                      variant="subtitle2"
                    >
                      {profile.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))}
        <Box mt={2}>
          <Button
            color="primary"
            data-testid="logout-button"
            fullWidth
            onClick={handleLogout}
            variant="outlined"
          >
            Sair da conta
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export { Profile };
