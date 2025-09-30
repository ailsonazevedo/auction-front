import {
  AccountBox,
  CorporateFare,
  Groups,
  People,
  Policy,
  Restore,
} from "@mui/icons-material";

export interface MenuitemsType {
  [x: string]: any;

  actions?: string[];
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  disabled?: boolean;
  external?: boolean;
  href?: string;
  icon?: any;
  id?: string;
  navlabel?: boolean;
  notActions?: string[];
  startWith?: string;
  subheader?: string;
  title?: string;

  variant?: "filled" | "outlined";
}

const MenuItemsAdmin: MenuitemsType[] = [
  {
    actions: ["*"],
    navlabel: true,
    subheader: "Admin",
  },
  {
    actions: ["*"],
    href: "/admin",
    icon: Restore,
    id: String(Math.random()),
    title: "Logs",
  },
  {
    actions: ["*"],
    href: "/admin/usuarios",
    icon: People,
    id: String(Math.random()),
    title: "Usuários",
  },
  {
    actions: ["*"],
    href: "/admin/unidades",
    icon: AccountBox,
    id: String(Math.random()),
    title: "Unidades",
  },
  {
    actions: ["*"],
    href: "/admin/grupos",
    icon: Groups,
    id: String(Math.random()),
    title: "Grupos",
  },
  {
    actions: ["*"],
    href: "/admin/organizacoes",
    icon: CorporateFare,
    id: String(Math.random()),
    title: "Organizações",
  },
  {
    actions: ["*"],
    href: "/admin/politicas",
    icon: Policy,
    id: String(Math.random()),
    title: "Políticas",
  },
];

export { MenuItemsAdmin };
