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
  useMemo,
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
  connectAuction: (auctionId: string) => Promise<void>;
  isAuctionConnected: boolean;
  isConnected: boolean;
  isNotificationConnected: boolean;
  notifications: INotification[];
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [isNotificationConnected, setIsNotificationConnected] = useState(false);
  const [isAuctionConnected, setIsAuctionConnected] = useState(false);
  const [auctionData, setAuctionData] = useState<AuctionData | null>(null);

  // Referências de instâncias
  const auctionWS = useRef<WebSocket | null>(null);
  const notificationWS = useRef<WebSocket | null>(null);
  const currentAuctionIdRef = useRef<null | string>(null);

  const initializingNotificationsRef = useRef(false);
  const initializingAuctionRef = useRef(false);

  const { addNotification, notifications } = useNotificationStore();

  const isActive = (ws: WebSocket | null) =>
    !!ws &&
    (ws.readyState === WebSocket.OPEN ||
      ws.readyState === WebSocket.CONNECTING);

  const connectNotifications = useCallback(async () => {
    if (initializingNotificationsRef.current) return;
    if (isActive(notificationWS.current)) return;

    initializingNotificationsRef.current = true;
    try {
      const tokens = await getTokens();
      if (!tokens?.access_token) return;

      const ws = createNotificationWebSocket(tokens.access_token);

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as {
            content?: INotification;
            type?: string;
          };
          if (data?.type === "send_notification" && data?.content) {
            const newNotification: INotification = {
              created_at: data.content.created_at,
              id: data.content.id,
              is_read: data.content.is_read,
              message: data.content.message,
              title: data.content.title,
              updated_at: data.content.updated_at,
              user: data.content.user,
            };
            addNotification(newNotification);
          }
        } catch (err) {
          console.error("Erro ao processar notificação WS:", err);
        }
      };

      ws.onopen = () => setIsNotificationConnected(true);
      ws.onclose = () => setIsNotificationConnected(false);
      ws.onerror = (e) => console.error("WebSocket notificações erro", e);

      notificationWS.current = ws;
    } finally {
      initializingNotificationsRef.current = false;
    }
  }, [addNotification]);

  const connectAuction = useCallback(async (auctionId: string) => {
    if (
      currentAuctionIdRef.current === auctionId &&
      isActive(auctionWS.current)
    )
      return;

    if (auctionWS.current && auctionWS.current.readyState === WebSocket.OPEN) {
      auctionWS.current.close();
    }

    if (initializingAuctionRef.current) return;
    initializingAuctionRef.current = true;
    try {
      const tokens = await getTokens();
      if (!tokens?.access_token) return;

      const ws = createAuctionWebSocket(tokens.access_token, auctionId);
      currentAuctionIdRef.current = auctionId;

      ws.onopen = () => setIsAuctionConnected(true);
      ws.onclose = () => {
        setIsAuctionConnected(false);
        setAuctionData((prev) =>
          prev?.type === "history" || prev?.type === "send_auction_message"
            ? null
            : prev,
        );
        if (currentAuctionIdRef.current === auctionId) {
          currentAuctionIdRef.current = null;
        }
      };

      ws.onerror = (e) => console.error("WebSocket leilão erro", e);

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
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
    } finally {
      initializingAuctionRef.current = false;
    }
  }, []);

  useEffect(() => {
    connectNotifications();
    return () => {
      notificationWS.current?.close();
      auctionWS.current?.close();
    };
  }, [connectNotifications]);

  const contextValue = useMemo<SocketContextType>(
    () => ({
      auctionData,
      connectAuction,
      isAuctionConnected,
      isConnected: isNotificationConnected || isAuctionConnected,
      isNotificationConnected,
      notifications,
    }),
    [
      auctionData,
      connectAuction,
      isNotificationConnected,
      isAuctionConnected,
      notifications,
    ],
  );

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
