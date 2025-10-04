"use client";
import Scrollbar from "@/components/@shared/Scrollbar/Scrollbar";
import { useGetAllNotifications } from "@/hooks/notifications/useGet/useGetAllNotifications";
import { useNotificationStore } from "@/stores/notificationStore/notification-store";
import { formatRelativeTime } from "@/utils/functions/@shared/formatRelativeTime";
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
import React, { useEffect, useState } from "react";

const Notifications = () => {
  const [anchorEl2, setAnchorEl2] = useState<HTMLElement | null>(null);
  const [loadingNotificationId, setLoadingNotificationId] = useState<
    null | string
  >(null);
  const { markAsRead, notifications, setNotifications } =
    useNotificationStore();

  const { data: notificationsData } = useGetAllNotifications();

  useEffect(() => {
    if (notificationsData) {
      setNotifications(notificationsData);
    }
  }, [notificationsData]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleMarkAsRead = (id: string) => {
    setLoadingNotificationId(id);
    markAsRead(id);
    setLoadingNotificationId(null);
  };

  const handleMarkAllAsRead = () => {
    notifications.filter((n) => !n.is_read).forEach((n) => markAsRead(n.id));
  };

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
          badgeContent={unreadCount}
          color="primary"
          invisible={unreadCount === 0}
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
          <Chip color="primary" label={`${unreadCount} novas`} size="small" />
        </Stack>
        {notifications.length > 0 && (
          <Box pb={1} px={2}>
            <Button
              disabled={unreadCount === 0}
              fullWidth
              onClick={handleMarkAllAsRead}
              size="small"
            >
              Marcar todas como lidas
            </Button>
          </Box>
        )}
        <Scrollbar sx={{ height: "385px" }}>
          {notifications && !notifications.length && (
            <Box display={"flex"} justifyContent={"center"} p={3}>
              <Typography color="textSecondary" variant="body2">
                Não há novas notificações
              </Typography>
            </Box>
          )}
          {notifications.map((notification) => (
            <Box key={notification.id}>
              <MenuItem
                sx={{ opacity: notification.is_read ? 0.6 : 1, px: 3, py: 2 }}
              >
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
                        {notification.title || "Atualização"}
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
                        {formatRelativeTime(notification.created_at)}
                      </Typography>
                    </Stack>
                    <Typography
                      color="textSecondary"
                      sx={{
                        mt: 0.5,
                        overflowWrap: "break-word",
                        whiteSpace: "normal",
                      }}
                      variant="body2"
                    >
                      {notification.message}
                    </Typography>{" "}
                    <Box
                      display="flex"
                      gap={1}
                      justifyContent={"center"}
                      mt={1}
                    >
                      {!notification.is_read && (
                        <Button
                          disableElevation
                          disabled={loadingNotificationId !== null}
                          endIcon={<DoneAll />}
                          onClick={() => handleMarkAsRead(notification.id)}
                          size="small"
                          variant="text"
                        >
                          {loadingNotificationId === notification.id
                            ? "Marcando..."
                            : "Marcar como lida"}
                        </Button>
                      )}
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
