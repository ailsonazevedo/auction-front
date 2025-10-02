"use client";
import Logo from "@/components/@shared/Logo/Logo";
import { Navigation } from "@/components/Layouts/vertical/header/Navigation/Navigation";
import Notifications from "@/components/Layouts/vertical/header/Notifications/Notifications";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { usePathname } from "next/navigation";

import { RightSideHeader } from "./RightSideHeader/RightSideHeader";

const Header = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  return (
    <AppBar
      color="default"
      position="sticky"
      sx={{
        backdropFilter: "blur(4px)",
        backgroundColor: isAdmin ? "admin.header.bg" : "user.header.bg",
        borderBottom: "1px solid rgba(242, 241, 239,.05)",
        boxShadow: "none",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{
          color: "user.header.color",
          flexDirection: { sm: "row", xs: "column" },
          px: { md: 12, sm: 4, xs: 2 },
          width: "100%",
        }}
      >
        <Logo />
        {/*<TogleSidebar />*/}
        <Box flexGrow={1} />
        <Navigation />
        <Notifications />
        <RightSideHeader />
      </Toolbar>
    </AppBar>
  );
};

export { Header };
