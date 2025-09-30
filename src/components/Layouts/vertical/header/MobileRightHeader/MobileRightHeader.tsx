import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  IconApps,
  IconCalendarEvent,
  IconChevronDown,
  IconChevronUp,
  IconGridDots,
  IconMail,
  IconMessages,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";

import { AppLinks } from "../AppLinks/AppLinks";

const MobileRightHeader = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const smallScreen = useMediaQuery("(max-width:500px)");

  const handleClick = () => {
    setOpen(!open);
  };

  const cartContent = (
    <Box>
      {/* ------------------------------------------- */}
      {/* Apps Content */}
      {/* ------------------------------------------- */}
      <Box px={1}>
        <List
          aria-labelledby="Lista-aninhada-de-sub-titulos"
          component="nav"
          sx={{ bgcolor: "background.paper", width: "100%" }}
        >
          <ListItemButton component={Link} href="/apps/chats">
            <ListItemIcon sx={{ minWidth: 35 }}>
              <IconMessages size="21" stroke="1.5" />
            </ListItemIcon>
            <ListItemText>
              <Typography fontWeight={600} variant="subtitle2">
                Chats
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton component={Link} href="/apps/calendar">
            <ListItemIcon sx={{ minWidth: 35 }}>
              <IconCalendarEvent size="21" stroke="1.5" />
            </ListItemIcon>
            <ListItemText>
              <Typography fontWeight={600} variant="subtitle2">
                Calendar
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton component={Link} href="/apps/email">
            <ListItemIcon sx={{ minWidth: 35 }}>
              <IconMail size="21" stroke="1.5" />
            </ListItemIcon>
            <ListItemText>
              <Typography fontWeight={600} variant="subtitle2">
                Email
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon sx={{ minWidth: 35 }}>
              <IconApps size="21" stroke="1.5" />
            </ListItemIcon>
            <ListItemText>
              <Typography fontWeight={600} variant="subtitle2">
                Apps
              </Typography>
            </ListItemText>
            {open ? (
              <IconChevronDown size="21" stroke="1.5" />
            ) : (
              <IconChevronUp size="21" stroke="1.5" />
            )}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box overflow="hidden" pt={3} px={4}>
              <AppLinks />
            </Box>
          </Collapse>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box>
      <IconButton
        color="inherit"
        onClick={() => setShowDrawer(true)}
        size="large"
        sx={{
          color: theme.palette.text.secondary,
        }}
      >
        <IconGridDots size="21" stroke="1.5" />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Cart Sidebar */}
      {/* ------------------------------------------- */}
      <Drawer
        PaperProps={{ sx: { width: smallScreen ? "100%" : "70%" } }}
        anchor="right"
        onClose={() => setShowDrawer(false)}
        open={showDrawer}
      >
        <Box
          alignItems={"center"}
          display={"flex"}
          justifyContent={"space-between"}
          p={3}
          pb={0}
        >
          <Typography fontWeight={600} variant="h5">
            Navigation
          </Typography>

          <IconButton onClick={() => setShowDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* component */}
        {cartContent}
      </Drawer>
    </Box>
  );
};

export { MobileRightHeader };
