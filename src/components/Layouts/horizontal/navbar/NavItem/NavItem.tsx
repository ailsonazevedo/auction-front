"use client";

import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavGroup = {
  [x: string]: any;
  children?: NavGroup[];
  chip?: string;
  chipColor?: any;
  external?: boolean;
  href?: any;
  icon?: any;
  id?: string;
  level?: number;
  navlabel?: boolean;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  subheader?: string;
  title?: string;
  variant?: "filled" | "outlined";
};

interface ItemType {
  readonly hideMenu?: any;
  readonly item: NavGroup;
  readonly level: number;
}

function NavItem({ hideMenu, item, level }: Readonly<ItemType>) {
  const pathname = usePathname();
  const theme = useTheme();
  const Icon = item.icon;

  const ListItemStyled = styled(ListItemButton)(() => ({
    "&.Mui-selected": {
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        color: theme.palette.user.sidebar.hover,
      },
      background: "rgba(0, 0, 0, 0.04)",
      color: theme.palette.user.sidebar.hover,
    },
    "&:hover": {
      background: "rgba(0, 0, 0, 0.04)",
      color: theme.palette.user.sidebar.hover,
    },
    backgroundColor: "inherit",
    borderRadius: `4px`,
    color:
      level && level > 1 && pathname === item?.href
        ? `${theme.palette.primary.main}!important`
        : theme.palette.user.navBar.text,
    margin: "2px",
    whiteSpace: "nowrap",
  }));
  return (
    <List component="li" disablePadding key={item.id}>
      <Link href={item.href} style={{ textDecoration: "none" }}>
        <ListItemStyled
          disabled={item?.disabled}
          onClick={() => item?.onClick}
          selected={pathname.startsWith(item?.href)}
        >
          {Icon && (
            <ListItemIcon
              sx={{ color: "inherit", marginRight: "10px", minWidth: "auto" }}
            >
              <Icon
                sx={{
                  color: "inherit",
                  fontSize: level && level > 1 ? "0.8rem" : "1.1rem",
                }}
              />
            </ListItemIcon>
          )}

          <ListItemText>
            {item.title}
            <br />
            {item?.subheader ? (
              <Typography variant="caption">
                {hideMenu ? "" : item?.subheader + " " + item?.id}
              </Typography>
            ) : (
              ""
            )}
          </ListItemText>

          {!item?.chip || hideMenu ? null : (
            <Chip
              color={item?.chipColor}
              label={item?.chip}
              size="small"
              sx={{ marginLeft: "5px" }}
              variant={item?.variant ? item?.variant : "filled"}
            />
          )}
        </ListItemStyled>
      </Link>
    </List>
  );
}

export { NavItem };
