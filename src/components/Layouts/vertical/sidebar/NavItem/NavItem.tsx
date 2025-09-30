"use client";

import { useSidebarStore } from "@/utils/providers/SidebarStoreProvider";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Theme, styled, useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

type NavGroup = {
  [x: string]: any;
  children?: NavGroup[];
  chip?: string;
  chipColor?: any;
  disabled?: boolean;
  external?: boolean;
  href?: any;
  icon?: any;
  id?: string;
  level?: number;
  navlabel?: boolean;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  startWith?: string;
  subheader?: string;
  title?: string;
  variant?: "filled" | "outlined";
};

interface ItemType {
  hideMenu: boolean;
  isAdmin: boolean;
  item: NavGroup;
  level?: number;
}
export function getColor(
  theme: Theme,
  level: number | undefined,
  pathName: string,
  item: any,
): string {
  if (level && level > 1 && pathName === item?.href) {
    return theme.palette.user.sidebar.hover;
  } else {
    return theme.palette.user.sidebar.light;
  }
}

const calculatePaddingLeft = (hideMenu: boolean, level?: number) => {
  if (hideMenu) {
    return "10px";
  }
  if (level && level > 1) {
    return `${level * 15}px`;
  } else {
    return "10px";
  }
};

export default function NavItem({
  hideMenu,
  isAdmin,
  item,
  level,
}: Readonly<ItemType>) {
  const theme = useTheme();
  const router = useRouter();
  const { toggleMobileBar } = useSidebarStore((state) => state);
  const userTheme = theme.palette.user;
  const adminTheme = theme.palette.admin;
  const pathName = usePathname();
  const Icon = item?.icon;
  let color = getColor(theme, level, pathName, item);
  const ListItemStyled = styled(ListItemButton)(() => ({
    "&.Mui-selected": {
      "&:hover": {
        backgroundColor: isAdmin
          ? adminTheme.sidebar.hover
          : userTheme.sidebar.hover,
        color: theme.palette.primary.light,
      },
      backgroundColor: isAdmin
        ? adminTheme.sidebar.hover
        : userTheme.sidebar.hover,
      color: theme.palette.primary.light,
    },
    "&:hover": {
      backgroundColor: isAdmin
        ? adminTheme.sidebar.hover
        : userTheme.sidebar.hover,
      color: "white",
    },
    backgroundColor: "inherit",
    borderRadius: `4px`,
    color: color,
    marginBottom: "2px",
    padding: "8px 10px",
    paddingLeft: calculatePaddingLeft(hideMenu, level),
    whiteSpace: "nowrap",
  }));

  const handleSelected = () => {
    if (item?.startWith && pathName.match(/criar/i)) {
      return pathName === item?.startWith;
    }
    return pathName === item?.href;
  };

  return (
    <List
      component="li"
      disablePadding
      key={item.id}
      onClick={() => toggleMobileBar()}
    >
      <ListItemStyled
        disabled={item?.disabled}
        onClick={() => {
          router.push(item.href);
        }}
        selected={handleSelected()}
        sx={{
          pointerEvents: item?.disabled ? "none" : "auto",
          textDecoration: "none",
        }}
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
          {Icon && hideMenu ? (
            <Icon sx={{ fontSize: "1.5rem" }} />
          ) : (
            <Icon sx={{ fontSize: level! > 1 ? "0.8rem" : "1.1rem" }} />
          )}
        </ListItemIcon>
        <ListItemText
          sx={{
            color: "inherit",
            overflowWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          {hideMenu ? "" : <>{item?.title}</>}

          <br />
          {item?.subtitle ? (
            <Typography variant="caption">
              {hideMenu ? "" : item?.subtitle}
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
            variant={item?.variant ? item?.variant : "filled"}
          />
        )}
      </ListItemStyled>
    </List>
  );
}
