import {
  CREATE_ESCALA,
  CREATE_ESTABELECIMENTO,
  CREATE_PROFISSIONAL,
  EQUIPE_ACTIONS,
  EQUIPE_SCOPE,
  ESCALA_ACTIONS,
  ESCALA_SCOPE,
  ESTABELECIMENTO_ACTIONS,
  ESTABELECIMENTO_SCOPE,
  PROFISSIONAL_ACTIONS,
  PROFISSIONAL_SCOPE,
  TIPO_PROFISSIONAL_ACTIONS,
  TIPO_PROFISSIONAL_SCOPE,
  TIPO_VINCULO_ACTIONS,
  TIPO_VINCULO_SCOPE,
} from "@/constants/gestao-rh/gestao-de-escalas/permissoes";
import {
  // Autorenew,
  Business,
  CalendarMonth,
  Diversity1,
  Groups,
  Link,
  ManageHistory,
  People,
  QueryStats,
  Settings,
} from "@mui/icons-material";
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
    actions: ESCALA_ACTIONS.map((action) => `${ESCALA_SCOPE}:${action}`),
    href: "/gestao-rh/gestao-de-escalas/calendario",
    icon: CalendarMonth,
    id: String(Math.random()), // Use um ID único e consistente
    title: "Calendário",
  },

  {
    actions: [
      `${ESCALA_SCOPE}:${CREATE_ESCALA}`,
      `${ESCALA_SCOPE}:${CREATE_PROFISSIONAL}`,
      `${ESTABELECIMENTO_SCOPE}:${CREATE_ESTABELECIMENTO}`,
    ],
    children: [
      {
        actions: PROFISSIONAL_ACTIONS.map(
          (action) => `${PROFISSIONAL_SCOPE}:${action}`,
        ),
        href: "/gestao-rh/gestao-de-escalas/profissionais",
        icon: Groups,
        id: String(Math.random()),
        title: "Profissionais",
      },
      {
        actions: ESTABELECIMENTO_ACTIONS.map(
          (action) => `${ESTABELECIMENTO_SCOPE}:${action}`,
        ),
        href: "/gestao-rh/gestao-de-escalas/estabelecimentos",
        icon: Business,
        id: String(Math.random()),
        title: "Estabelecimentos",
      },
      {
        actions: EQUIPE_ACTIONS.map((action) => `${EQUIPE_SCOPE}:${action}`),
        href: "/gestao-rh/gestao-de-escalas/equipes",
        icon: Diversity1,
        id: String(Math.random()),
        title: "Equipes",
      },
      {
        actions: ESCALA_ACTIONS.map((action) => `${ESCALA_SCOPE}:${action}`),
        href: "/gestao-rh/gestao-de-escalas/escalas",
        icon: ManageHistory,
        id: String(Math.random()),
        title: "Escalas",
      },

      {
        actions: TIPO_PROFISSIONAL_ACTIONS.map(
          (action) => `${TIPO_PROFISSIONAL_SCOPE}:${action}`,
        ),
        href: "/gestao-rh/gestao-de-escalas/tipos-profissionais",
        icon: People,
        id: String(Math.random()),
        title: "Tipos de Profissionais",
      },
      {
        actions: TIPO_VINCULO_ACTIONS.map(
          (action) => `${TIPO_VINCULO_SCOPE}:${action}`,
        ),
        href: "/gestao-rh/gestao-de-escalas/tipos-vinculos",
        icon: Link,
        id: String(Math.random()),
        title: "Tipos de vínculos",
      },
      {
        actions: ["*"],
        href: "/gestao-rh/gestao-de-escalas/relatorios",
        icon: QueryStats,
        id: String(Math.random()),
        title: "Relatórios",
      },
    ],

    icon: Settings,
    id: String(Math.random()),
    title: "Administrador",
  },
];
export { MenuItems };
