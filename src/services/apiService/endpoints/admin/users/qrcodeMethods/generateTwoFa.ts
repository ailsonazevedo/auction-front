import { getTokens } from "@/actions/get-token";
import { API_RESOURCE_AUTH } from "@/constants/services";
import axios from "axios";

const instance = axios.create({
  baseURL: `${API_RESOURCE_AUTH}`,
  responseType: "blob",
});

instance.interceptors.request.use(
  async (config) => {
    const { access_token } = await getTokens();

    config.headers["Authorization"] = "Bearer " + access_token;
    return config;
  },
  (error) => {
    return Promise.reject(new Error("Erro: " + error.message));
  },
);

const GENERATE_QRCODE = {
  create: async (): Promise<any> => {
    return await instance.post(`/iam/users/2FA/generate`);
  },
};

export { GENERATE_QRCODE };
