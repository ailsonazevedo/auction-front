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

type AuctionHistoryBid = {
  bid_amount: number;
  created_at: string;
  id: string;
  name?: string;
  profile_id: string;
};

// AuctionData pode ser um histórico ou um novo lance
export type AuctionData =
  | {
      auction_id: string;
      name: string;
      new_bid: string;
      profile_id: string;
      type: "send_auction_message";
    }
  | { bids: AuctionHistoryBid[]; type: "history" };

interface SocketContextType {
  auctionData: AuctionData | null;
  connectAuction: (auctionId: string) => void;
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
        console.log("[WS Notification] Mensagem recebida:", data);
        if (!data?.type || !data?.content) return;
        const notification = {
          content: data.content,
          logId: Date.now(),
          read_at: null,
          sent_at: new Date().toISOString(),
          type: data.type,
          was_read: false,
        };
        setNotifications((prev) => [notification, ...prev]);
        addNotification(notification);
      } catch (err) {
        console.error("Erro ao processar notificação WS:", err);
      }
    };
    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    notificationWS.current = ws;
  }, [addNotification]);

  // Função para conectar ao WebSocket do leilão
  const connectAuction = useCallback(async (auctionId: string) => {
    const tokens = await getTokens();
    if (!tokens?.access_token) return;
    if (auctionWS.current) auctionWS.current.close();
    const ws = createAuctionWebSocket(tokens.access_token, auctionId);
    ws.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket aberto");
    };
    ws.onclose = (e) => {
      setIsConnected(false);
      console.log("WebSocket fechado", e);
    };
    ws.onerror = (e) => {
      console.error("WebSocket erro", e);
    };
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Mensagem WS:", data);
        if (data.type === "history") {
          setAuctionData({ bids: data.bids, type: "history" });
        } else if (data.type === "send_auction_message" && data.content) {
          setAuctionData({ type: "send_auction_message", ...data.content });
        }
      } catch (err) {
        console.error("Erro ao processar mensagem WS:", err);
      }
    };
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
