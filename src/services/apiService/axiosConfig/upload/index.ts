import { getTokens } from "@/actions/get-token";
import { API_URL_BASE } from "@/constants/services";
import axios from "axios";

const instance = axios.create({
  baseURL: `${API_URL_BASE}`,
});

instance.interceptors.request.use(
  async (config) => {
    config.headers["Content-Type"] = "multipart/form-data";
    try {
      const { access_token, refresh_token } = await getTokens();
      if (access_token && refresh_token) {
        const response = await fetch(`/api/auth/refresh`, {
          body: JSON.stringify({ access_token, refresh_token }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });
        const responseObj = await response.json();
        if (!responseObj.result) {
          window.location.href = "/api/auth/logout";
        } else if (responseObj.access_token) {
          config.headers["Authorization"] =
            "Bearer " + responseObj.access_token;
        }
      }
    } catch (e) {
      window.location.href = "/api/auth/logout";
    }

    return config;
  },
  (error) => {
    return Promise.reject(new Error("Erro: " + error.message));
  },
);

export { instance as axiosUpload };
