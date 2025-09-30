"use client";
import ListSubheader from "@mui/material/ListSubheader";
import { Theme, styled } from "@mui/material/styles";
import { IconDots } from "@tabler/icons-react";
import React from "react";

type NavGroup = {
  navlabel?: boolean;
  subheader?: string;
};

interface ItemType {
  hideMenu: boolean;
  isAdmin: boolean;
  item: NavGroup;
}

const NavGroup = ({ hideMenu, isAdmin, item }: ItemType) => {
  const ListSubheaderStyle = styled(ListSubheader)(
    ({ theme }: { theme: Theme }) => ({
      ...theme.typography.overline,
      color: theme.palette.user.sidebar.light,
      fontWeight: "700",
      lineHeight: "26px",
      marginBottom: theme.spacing(0),
      marginLeft: hideMenu ? "" : "-10px",
      marginTop: theme.spacing(3),
      padding: "3px 12px",
    }),
  );

  return (
    <ListSubheaderStyle
      disableSticky
      sx={{ textAlign: hideMenu ? "center" : "" }}
    >
      {hideMenu ? <IconDots size="20" /> : item?.subheader}
    </ListSubheaderStyle>
  );
};

export default NavGroup;
