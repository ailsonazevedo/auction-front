import { Settings } from "@mui/icons-material";
export interface MenuitemsType {
  [x: string]: any;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  external?: boolean;
  href?: string;
  icon?: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  variant?: "filled" | "outlined";
}

const MenuItems: MenuitemsType[] = [
  {
    icon: Settings,
    id: String(Math.random()),
    title: "Administrador",
  },
];
export { MenuItems };
