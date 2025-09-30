"use client";

import { INotification } from "@/@types/INotification";
import { getLoggedUserId } from "@/actions/get-logged-user-id";
import { getTokens } from "@/actions/get-token";
import { socket } from "@/socket";
import { useNotificationStore } from "@/stores/notificationStore/notification-store";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface SocketContextType {
  emit: (event: string, data?: any) => void;
  isConnected: boolean;
  subscribeToNotifications: () => void;
  transport: string;
  unsubscribeFromNotifications: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const isSubscribedRef = useRef(false);
  const { addNotification, notifications } = useNotificationStore();
  const handleNewNotification = useCallback(
    (data: INotification) => {
      const notificationExists = notifications.some(
        (notification) => notification.logId === data.logId,
      );
      if (!notificationExists) {
        addNotification(data);
      }
    },
    [addNotification, notifications],
  );

  const onConnect = useCallback(() => {
    setIsConnected(true);
    setTransport(socket.io.engine.transport.name);
  }, []);

  const onDisconnect = useCallback(() => {
    setIsConnected(false);
    setTransport("N/A");
  }, []);

  const subscribeToNotifications = useCallback(async () => {
    if (isSubscribedRef.current) return;

    try {
      const userId = await getLoggedUserId();
      const tokens = await getTokens();
      if (!userId || !tokens) {
        console.error("User ID or tokens not available");
        return;
      }
      if (socket.connected) {
        socket.emit("notifications.push.new", { recipientId: userId });
      } else {
        socket.auth = { Authorization: `Bearer ${tokens.access_token}` };
        socket.once("connect", () => {
          socket.emit("notifications.push.new", { recipientId: userId });
        });
      }

      isSubscribedRef.current = true;
    } catch (error) {
      console.error("Error subscribing to notifications:", error);
    }
  }, []);

  const unsubscribeFromNotifications = useCallback(() => {
    socket.off("notifications.push.new", handleNewNotification);
    isSubscribedRef.current = false;
  }, [handleNewNotification]);

  const emit = useCallback((event: string, data?: any) => {
    socket.emit(event, data);
  }, []);

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("notifications.push.new", handleNewNotification);

    subscribeToNotifications();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("notifications.push.new", handleNewNotification);
      isSubscribedRef.current = false;
    };
  }, [
    onConnect,
    onDisconnect,
    handleNewNotification,
    subscribeToNotifications,
  ]);

  const contextValue: SocketContextType = {
    emit,
    isConnected,
    subscribeToNotifications,
    transport,
    unsubscribeFromNotifications,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
