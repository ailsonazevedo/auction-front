"use client";

import Logo from "@/components/@shared/Logo/Logo";
import Scrollbar from "@/components/@shared/Scrollbar/Scrollbar";
import { useSidebarStore } from "@/utils/providers/SidebarStoreProvider";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePathname } from "next/navigation";

import { MenuitemsType } from "./MenuItems";
import { Profile } from "./SidebarProfile/Profile";
import { SidebarItems } from "./Sidebaritems";

const Sidebar = ({ menuItems }: { menuItems: MenuitemsType[] }) => {
  const {
    SidebarWidth,
    isCollapse,
    isMobileSidebar,
    isSidebarHover,
    miniSidebar,
    toggleMobileBar,
    toggleMobileBarHover,
  } = useSidebarStore((state) => state);
  const smallScreen = useMediaQuery("(max-width:1199px)");
  const theme = useTheme();
  const toggleWidth =
    isCollapse && !isSidebarHover ? miniSidebar : SidebarWidth;
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const onHoverEnter = () => {
    if (isCollapse && !isSidebarHover) {
      toggleMobileBarHover(true);
    }
  };

  const onHoverLeave = () => {
    if (isSidebarHover) {
      toggleMobileBarHover(false);
    }
  };
  if (smallScreen) {
    return (
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: isAdmin ? "admin.sidebar.bg" : "user.sidebar.bg",
            border: "0 !important",
            transition: "all 0.3s",
            width: { sm: SidebarWidth, xs: "80%" },
          },
        }}
        anchor="left"
        data-testid="sidebarBoxMobile"
        onClose={() => toggleMobileBar()}
        open={isMobileSidebar}
        variant="temporary"
      >
        {/* ------------------------------------------- */}
        {/* Logo */}
        {/* ------------------------------------------- */}
        <Box px={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Logo />
        </Box>
        {/* ------------------------------------------- */}
        {/* Sidebar For Mobile */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Sidebar Items */}
        {/* ------------------------------------------- */}
        <Scrollbar sx={{ height: "calc(100% - 100px)" }}>
          <SidebarItems data={menuItems} />
        </Scrollbar>
      </Drawer>
    );
  }
  return (
    <Box
      sx={{
        flexShrink: 0,
        width: { lg: toggleWidth, xs: "0%" },
        zIndex: 100,
        ...(isCollapse && {
          position: "absolute",
        }),
      }}
    >
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: isAdmin ? "admin.sidebar.bg" : "user.sidebar.bg",
            border: "0 !important",
            boxSizing: "border-box",
            transition: theme.transitions.create("width", {
              duration: theme.transitions.duration.shortest,
            }),
            width: { lg: toggleWidth, xs: "0%" },
          },
        }}
        anchor="left"
        onMouseEnter={onHoverEnter}
        onMouseLeave={onHoverLeave}
        open
        sx={{
          backgroundColor: "blue",
          position: "absolute",
        }}
        variant="permanent"
      >
        {/* ------------------------------------------- */}
        {/* Sidebar Box */}
        {/* ------------------------------------------- */}
        <Box sx={{ height: "100%" }}>
          {/* ------------------------------------------- */}
          {/* Logo */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              backgroundColor: isAdmin ? "admin.header.bg" : "user.header.bg",
              borderRadius: "0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Logo />
          </Box>
          <Scrollbar sx={{ height: "calc(100% - 190px)" }}>
            {/* ------------------------------------------- */}
            {/* Sidebar Items */}
            <SidebarItems data={menuItems} />
            {/* ------------------------------------------- */}
          </Scrollbar>

          <Profile />
        </Box>
      </Drawer>
      {/* ------------------------------------------- */}
      {/* Sidebar for desktop */}
      {/* ------------------------------------------- */}
    </Box>
  );
};

export { Sidebar };
