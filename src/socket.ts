"use client";

import { WS_URL_BASE } from "./constants/services";

const URL = WS_URL_BASE;

export function createNotificationWebSocket(token: string) {
  return new WebSocket(`${URL}/ws/notifications/?token=${token}`);
}
