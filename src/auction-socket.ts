"use client";

import { WS_URL_BASE } from "./constants/services";

const URL = WS_URL_BASE;

export function createAuctionWebSocket(token: string, auctionId: string) {
  return new WebSocket(`${URL}/ws/auction/${auctionId}/?token=${token}`);
}
