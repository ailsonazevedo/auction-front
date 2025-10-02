"use client";

import { INotification } from "@/@types/INotification";
import { getTokens } from "@/actions/get-token";
import { createAuctionWebSocket } from "@/auction-socket";
import { createNotificationWebSocket } from "@/socket";
import { useNotificationStore } from "@/stores/notificationStore/notification-store";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface AuctionData {
  new_bid: string;
  portfolio_id: string;
  profile_id: string;
}

interface SocketContextType {
  auctionData: AuctionData | null;
  connectAuction: (portfolioId: string) => void;
  emit: (event: string, data?: any) => void;
  isConnected: boolean;
  notifications: INotification[];
  transport: string;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
  const auctionWS = useRef<WebSocket | null>(null);
  const notificationWS = useRef<WebSocket | null>(null);
  const { addNotification, notifications: storedNotifications } =
    useNotificationStore();

  // Função para conectar ao WebSocket de notificações
  const connectNotifications = useCallback(async () => {
    const tokens = await getTokens();
    if (!tokens?.access_token) return;
    const ws = createNotificationWebSocket(tokens.access_token);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setNotifications((prev) => {
          if (prev.some((n) => n.logId === data.logId)) return prev;
          return [data, ...prev];
        });
        addNotification(data);
      } catch {}
    };
    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    notificationWS.current = ws;
  }, [addNotification]);

  // Função para conectar ao WebSocket do leilão
  const connectAuction = useCallback(async (portfolioId: string) => {
    const tokens = await getTokens();
    if (!tokens?.access_token) return;
    if (auctionWS.current) auctionWS.current.close();
    const ws = createAuctionWebSocket(tokens.access_token, portfolioId);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setAuctionData(data);
      } catch {}
    };
    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    auctionWS.current = ws;
  }, []);

  useEffect(() => {
    connectNotifications();
    return () => {
      notificationWS.current?.close();
      auctionWS.current?.close();
    };
  }, [connectNotifications]);

  const emit = () => {};

  const contextValue: SocketContextType = {
    auctionData,
    connectAuction,
    emit,
    isConnected,
    notifications,
    transport,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => React.useContext(SocketContext);
