"use server";

import { ICreateUser } from "@/@types/user/IUser";
import { API_RESOURCE_AUTH } from "@/constants/services";

export async function registerUser(data: ICreateUser) {
  const response = await fetch(API_RESOURCE_AUTH + "/iam/users", {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  if (!response.ok) {
    return await response.json();
  }
  return await response.json();
}
