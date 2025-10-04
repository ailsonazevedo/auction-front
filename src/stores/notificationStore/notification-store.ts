import { INotification } from "@/@types/INotification";
import { create } from "zustand";

interface NotificationStore {
  addNotification: (notification: INotification) => void;
  clearNotifications: () => void;
  markAsRead: (id: string) => void;
  notifications: INotification[];
  removeNotification: (id: string) => void;
  setNotifications: (notifications: INotification[]) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  addNotification: (notification) =>
    set((state) => {
      if (state.notifications.some((n) => n.id === notification.id))
        return state;
      return { notifications: [notification, ...state.notifications] };
    }),
  clearNotifications: () => set({ notifications: [] }),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id
          ? { ...n, is_read: true, updated_at: new Date().toISOString() }
          : n,
      ),
    })),
  notifications: [],
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  setNotifications: (notifications) => set({ notifications }),
}));
