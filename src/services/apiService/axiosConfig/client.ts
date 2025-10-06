import { getTokens } from "@/actions/get-token";
import { API_URL_BASE } from "@/constants/services";
import axios from "axios";

const instance = axios.create({
  baseURL: `${API_URL_BASE}`,
});

instance.interceptors.request.use(
  async (config) => {
    const { access_token, refresh_token } = await getTokens();
    if (access_token && refresh_token) {
      const response = await fetch(`/api/auth/refresh`, {
        body: JSON.stringify({
          access_token: access_token,
          refresh_token: refresh_token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const responseObj = await response.json();
      if (!responseObj.result) {
        window.location.href = "/api/auth/logout";
      }

      config.headers["Authorization"] = "Bearer " + responseObj.access_token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error("Erro: " + error.message));
  },
);

export { instance as axiosConfig };
