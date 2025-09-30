"use server";

import { cookies } from "next/headers";

export async function getTokens() {
  const access_token = cookies().get("access_token")?.value;
  const refresh_token = cookies().get("refresh_token")?.value;

  return { access_token, refresh_token };
}
