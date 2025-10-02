"use client";
import Scrollbar from "@/components/@shared/Scrollbar/Scrollbar";
import { formatRelativeTime } from "@/utils/functions/@shared/formatRelativeTime";
import { useSocket } from "@/utils/providers/SocketProvider";
import { DoneAll } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { IconBellRinging } from "@tabler/icons-react";
import React, { useState } from "react";

const Notifications = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [loadingNotificationId, setLoadingNotificationId] = useState<
    null | number
  >(null);
  // const { notifications, removeNotification } = useNotificationStore();
  // const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { notifications } = useSocket() || { notifications: [] };

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // const handleMarkAsRead = (logId: number) => {
  //   setLoadingNotificationId(logId);
  //   markAsRead(logId.toString(), {
  //     onError: () => {
  //       setLoadingNotificationId(null);
  //     },
  //     onSuccess: () => {
  //       removeNotification(logId);
  //       setLoadingNotificationId(null);
  //     },
  //   });
  // };

  return (
    <Box>
      <IconButton
        aria-controls="msgs-menu"
        aria-haspopup="true"
        aria-label="ver novas notificações"
        color="inherit"
        onClick={handleClick2}
        size="large"
        sx={{
          color: "text.secondary",
        }}
      >
        <Badge
          badgeContent={notifications.length}
          color="primary"
          invisible={notifications.length === 0}
          max={99}
        >
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
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
            width: "360px",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          px={4}
          py={2}
        >
          <Typography variant="h6">Notificações</Typography>
          <Chip
            color="primary"
            label={`${notifications.length} novas mensagens`}
            size="small"
          />
        </Stack>
        <Scrollbar sx={{ height: "385px" }}>
          {notifications && !notifications.length && (
            <Box display={"flex"} justifyContent={"center"} p={3}>
              <Typography color="textSecondary" variant="body2">
                Não há novas notificações
              </Typography>
            </Box>
          )}
          {notifications.map((notification) => (
            <Box key={notification.logId}>
              <MenuItem component="a" sx={{ px: 3, py: 2 }}>
                <Stack direction="row" spacing={2}>
                  <Box>
                    <Stack
                      alignItems="center"
                      direction="row"
                      justifyContent={"space-between"}
                      spacing={1}
                    >
                      <Typography
                        color="textPrimary"
                        fontWeight={600}
                        noWrap
                        sx={{
                          width: "180px",
                        }}
                        variant="subtitle2"
                      >
                        {notification.message_title}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "0.75rem",
                          minWidth: "max-content",
                          whiteSpace: "nowrap",
                        }}
                        variant="caption"
                      >
                        {formatRelativeTime(notification.sent_at)}
                      </Typography>
                    </Stack>
                    <Typography
                      color="textSecondary"
                      noWrap
                      sx={{
                        overflowWrap: "break-word",
                        whiteSpace: "normal",
                      }}
                      variant="body2"
                    >
                      {notification.message_content}
                    </Typography>{" "}
                    <Box
                      display="flex"
                      gap={1}
                      justifyContent={"center"}
                      mt={1}
                    >
                      <Button
                        disableElevation
                        disabled={loadingNotificationId !== null}
                        endIcon={<DoneAll />}
                        // onClick={() => handleMarkAsRead(notification.logId)}
                        size="small"
                        variant="text"
                      >
                        {loadingNotificationId === notification.logId
                          ? "Marcando..."
                          : "Marcar como lido"}
                      </Button>
                    </Box>
                  </Box>
                </Stack>
              </MenuItem>
            </Box>
          ))}
        </Scrollbar>
      </Menu>
    </Box>
  );
};

export default Notifications;
