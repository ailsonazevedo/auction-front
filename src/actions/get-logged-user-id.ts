"use server";

import { decodeToken } from "@/utils/functions/@shared/decodeTokenJwt";
import { cookies } from "next/headers";

const getLoggedUserId = async (): Promise<string> => {
  const tokenValue = cookies().get("access_token")?.value;
  if (!tokenValue) {
    console.error("No access token found in cookies.");
    return "";
  }
  const decodedData = decodeToken(tokenValue);
  const { sub: userId } = decodedData;
  return userId as string;
};

export { getLoggedUserId };
