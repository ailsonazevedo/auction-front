import { getTokens } from "@/actions/get-token";
import { API_RESOURCE_AUTH } from "@/constants/services";
import axios from "axios";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";

const instanceAuth = axios.create({
  baseURL: `${API_RESOURCE_AUTH}`,
});

instanceAuth.interceptors.request.use(
  async (config) => {
    const { access_token, refresh_token } = await getTokens();
    const originUrl = headers().get("x-current-path");

    if (access_token && refresh_token) {
      try {
        const response = await fetch(`${originUrl}/api/auth/refresh`, {
          body: JSON.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseObj = await response.json();
        if (!responseObj.result) {
          redirect(`${originUrl}/api/auth/logout`);
        }
        config.headers["Authorization"] = "Bearer " + responseObj.access_token;
      } catch (error) {
        redirect(`${originUrl}/api/auth/logout`);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error("Erro: " + error.message));
  },
);

const getPoliciesAuth = {
  get: async (): Promise<any> => {
    return await instanceAuth.get(`/iam/policies/me`);
  },
};

export { getPoliciesAuth };
