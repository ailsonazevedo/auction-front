import { INotification } from "@/@types/INotification";
import { create } from "zustand";

interface NotificationStore {
  addNotification: (notification: INotification) => void;
  clearNotifications: () => void;
  markAsRead: (logId: number) => void;
  notifications: INotification[];
  removeNotification: (logId: number) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  addNotification: (notification) =>
    set((state) => {
      if (state.notifications.some((n) => n.logId === notification.logId)) return state;
      return { notifications: [notification, ...state.notifications] };
    }),
  clearNotifications: () => set({ notifications: [] }),
  markAsRead: (logId) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.logId === logId ? { ...n, read_at: new Date().toISOString(), was_read: true } : n
      ),
    })),
  notifications: [],
  removeNotification: (logId) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.logId !== logId),
    })),
}));

