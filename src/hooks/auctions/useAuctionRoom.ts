import type { AuctionData } from "@/utils/providers/SocketProvider";

import { useSocket } from "@/utils/providers/SocketProvider";
import { useEffect } from "react";

export function useAuctionRoom(auctionId: string) {
  const { auctionData, connectAuction, isAuctionConnected } = useSocket();

  useEffect(() => {
    if (auctionId) {
      connectAuction(auctionId);
    }
  }, [auctionId, connectAuction]);

  return { auctionData: auctionData as AuctionData | null, isAuctionConnected };
}
