"use client";

import { AbilityContext } from "@/utils/providers/AbilityProvider";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Theme, styled, useTheme } from "@mui/material/styles";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import React, { useContext, useState } from "react";

import NavItem from "../NavItem/NavItem";

type NavGroupProps = {
  [x: string]: any;
  disabled?: boolean;
  href?: any;
  icon?: any;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
};

interface NavCollapseProps {
  hideMenu: boolean;
  isAdmin: boolean;
  readonly level: number;
  readonly menu: NavGroupProps;
}

export default function NavCollapse({
  hideMenu,
  isAdmin,
  level,
  menu,
}: Readonly<NavCollapseProps>) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const pathname = usePathname();
  const Icon = menu?.icon;
  const ability = useContext(AbilityContext);

  const isContratado =
    !ability.can("manage", "all");
  const handleClick = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    setOpen(false);
    menu?.children?.forEach((item: any) => {
      if (isContratado) {
        setOpen(true);
      }
      if (item?.href === pathname || pathname?.startsWith(item?.startWith)) {
        setOpen(true);
      }
    });
  }, [pathname, menu.children, isContratado]);

  function getColor(level: number, open: boolean, theme: Theme) {
    if (level > 1 && open) {
      return theme.palette.user.sidebar.light;
    }
    if (level === 0) {
      return theme.palette.user.sidebar.light;
    } else if (level === 1 && open) {
      return theme.palette.user.sidebar.hover;
    } else {
      return theme.palette.user.sidebar.light;
    }
  }
  const paddingL = level > 1 ? `${level * 15}px` : "10px";
  const ListItemStyled = styled(ListItemButton)(() => ({
    "&:hover": {
      color: theme.palette.user.sidebar.hover,
    },
    backgroundColor: "transparent !important",
    borderRadius: "4px",
    color: getColor(level, open, theme),
    marginBottom: "2px",
    padding: "8px 10px",
    paddingLeft: hideMenu ? "10px" : paddingL,
    whiteSpace: "nowrap",
  }));

  const renderIcon = () => {
    if (hideMenu) {
      return <Icon sx={{ fontSize: "1.5rem" }} />;
    }

    return <Icon sx={{ fontSize: level > 1 ? "0.9rem" : "1.1rem" }} />;
  };

  // If Menu has Children
  const submenus = menu.children?.map((item: any) => {
    if (item.children) {
      return (
        <NavCollapse
          hideMenu={hideMenu}
          isAdmin={isAdmin}
          key={item.id}
          level={level + 1}
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
          level={level + 1}
        />
      );
    }
  });
  return (
    <>
      <ListItemStyled
        disabled={menu.disabled}
        onClick={handleClick}
        selected={pathname === menu.href}
      >
        <ListItemIcon
          sx={{
            alignItems: hideMenu ? "center" : "",
            color: "inherit",
            justifyContent: hideMenu ? "center" : "",
            minWidth: hideMenu ? "100%" : "36px",
            p: "3px 0",
          }}
        >
          {Icon && renderIcon()}
        </ListItemIcon>
        <ListItemText color="inherit">
          {hideMenu ? "" : <>{menu.title}</>}
        </ListItemText>
        {!hideMenu &&
          (!open ? (
            <IconChevronDown size="1rem" />
          ) : (
            <IconChevronUp size="1rem" />
          ))}
      </ListItemStyled>
      <Collapse in={open} timeout="auto">
        {submenus}
      </Collapse>
    </>
  );
}
