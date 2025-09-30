interface IAppsLink {
  avatar: string;
  href: string;
  subtext: string;
  title: string;
}

const appsLink: IAppsLink[] = [
  {
    avatar: "/profile/user-1.jpg",
    href: "/apps/chats",
    subtext: "New messages arrived",
    title: "Chat Application",
  },
  {
    avatar: "/profile/user-1.jpg",
    href: "/apps/ecommerce/shop",
    subtext: "New stock available",
    title: "eCommerce App",
  },
  {
    avatar: "/profile/user-1.jpg",
    href: "/apps/notes",
    subtext: "To-do and Daily tasks",
    title: "Notes App",
  },
  {
    avatar: "/profile/user-1.jpg",
    href: "/apps/calendar",
    subtext: "Get dates",
    title: "WrapperCalendar App",
  },
  {
    avatar: "/profile/user-1.jpg",
    href: "/apps/contacts",
    subtext: "2 Unsaved Contacts",
    title: "Contact Application",
  },
  {
    avatar: "/profile/user-1.jpg",
    href: "/apps/tickets",
    subtext: "Submit tickets",
    title: "Tickets App",
  },
  {
    avatar: "/profile/user-1.jpg",
    href: "/apps/email",
    subtext: "Get new emails",
    title: "Email App",
  },
  {
    avatar: "/profile/user-1.jpg",
    href: "/apps/blog/post",
    subtext: "added new blog",
    title: "Blog App",
  },
];

interface INotification {
  avatar: string;
  id: string;
  subtitle: string;
  title: string;
}

const notifications: INotification[] = [
  {
    avatar: "/profile/user-1.jpg",
    id: "1",
    subtitle: "Congratulate him",
    title: "Roman Joined the Team!",
  },
  {
    avatar: "/profile/user-1.jpg",
    id: "2",
    subtitle: "Salma sent you new message",
    title: "New message received",
  },
  {
    avatar: "/profile/user-1.jpg",
    id: "3",
    subtitle: "Check your earnings",
    title: "New Payment received",
  },
  {
    avatar: "/profile/user-1.jpg",
    id: "4",
    subtitle: "Assign her new tasks",
    title: "Jolly completed tasks",
  },
  {
    avatar: "/profile/user-1.jpg",
    id: "5",
    subtitle: "Congratulate him",
    title: "Roman Joined the Team!",
  },
  {
    avatar: "/profile/user-1.jpg",
    id: "6",
    subtitle: "Salma sent you new message",
    title: "New message received",
  },
  {
    avatar: "/profile/user-1.jpg",
    id: "7",
    subtitle: "Check your earnings",
    title: "New Payment received",
  },
  {
    avatar: "/profile/user-1.jpg",
    id: "8",
    subtitle: "Assign her new tasks",
    title: "Jolly completed tasks",
  },
];

interface ProfileType {
  href: string;
  icon: any;
  subtitle: string;
  title: string;
}
const profile: ProfileType[] = [
  {
    href: "/meu-perfil",
    icon: "/profile/user-1.jpg",
    subtitle: "Configurações da conta",
    title: "Meu perfil",
  },
];

export { appsLink, notifications, profile };
