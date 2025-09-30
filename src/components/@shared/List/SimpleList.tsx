import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

interface ListItemsProps {
  icon?: React.ReactNode;
  id: number | string;
  onClick?: () => void;
  primary: string;
  secondary?: string;
}

interface Props {
  listItems: ListItemsProps[];
}

const SimpleList = ({ listItems }: Props) => {
  return (
    <List>
      {listItems.map((item) => (
        <ListItem disablePadding key={item.id} onClick={item.onClick}>
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.primary} secondary={item.secondary} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export { SimpleList };
