"use client";

import { WS_URL_BASE } from "./constants/services";

const URL = WS_URL_BASE;

export function createAuctionWebSocket(token: string, portfolioId: string) {
  return new WebSocket(`${URL}/ws/portfolio/${portfolioId}/?token=${token}`);
}
