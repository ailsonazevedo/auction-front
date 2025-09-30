"use client";
import { Box } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import { IconChevronDown } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import React from "react";

import { NavItem } from "../NavItem/NavItem";

type NavGroupProps = {
  [x: string]: any;
  href?: any;
  icon?: any;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
};

interface NavCollapseProps {
  hideMenu?: any;
  icon?: any;
  level: number;
  menu: NavGroupProps;
}
// FC Component For Dropdown Menu
const NavCollapse = ({ hideMenu, icon, level, menu }: NavCollapseProps) => {
  const theme = useTheme();
  // ALERT: solução temporária para o icone do menu
  const Icon = menu.icon;
  const pathname = usePathname();

  const ListItemStyled = styled(ListItemButton)(() => ({
    "&:hover": {
      backgroundColor: pathname.includes(menu.href)
        ? theme.palette.primary.main
        : "rgba(0, 0, 0, 0.04)",
    },
    "&:hover > .SubNav": { display: "block" },
    borderRadius: `10px`,
    color:
      pathname.includes(menu.href) || level < 1
        ? "white"
        : theme.palette.user.navBar.text,
    flexGrow: "unset",
    gap: "10px",
    padding: "5px 10px",
    position: "relative",
    whiteSpace: "nowrap",
    width: "auto",
  }));

  const ListSubMenu = styled(Box)(() => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[8],
    color: theme.palette.text.primary,
    display: "none",
    left: level > 1 ? `${level + 235}px` : "0px",
    padding: "10px",
    position: "absolute",
    top: level > 1 ? `0px` : "40px",
    width: "250px",
    zIndex: 1,
  }));

  const listItemProps: {
    component: string;
  } = {
    component: "li",
  };

  // If Menu has Children
  const submenus = menu.children?.map((item: any) => {
    if (item.children) {
      return (
        <NavCollapse
          hideMenu={hideMenu}
          key={item.id}
          level={level + 1}
          menu={item}
        />
      );
    } else {
      return (
        <NavItem
          hideMenu={hideMenu}
          item={item}
          key={item.id}
          level={level + 1}
        />
      );
    }
  });

  return (
    <ListItemStyled {...listItemProps}>
      {Icon && (
        <ListItemIcon
          sx={{ color: "inherit", marginRight: "0px", minWidth: "auto" }}
        >
          <Icon
            sx={{
              color: "inherit",
            }}
          />
        </ListItemIcon>
      )}
      <ListItemText color="inherit" sx={{ mr: "auto" }}>
        {hideMenu ? "" : <>{menu.title}</>}
      </ListItemText>
      <IconChevronDown size="1rem" />
      <ListSubMenu className="SubNav" component={"ul"}>
        {submenus}
      </ListSubMenu>
    </ListItemStyled>
  );
};

export { NavCollapse };
