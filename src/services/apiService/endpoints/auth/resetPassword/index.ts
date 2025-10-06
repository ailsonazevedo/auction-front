import { API_RESOURCE_AUTH } from "@/constants/services";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

export type TRecoverPassword = {
  email: string;
  newPassword: string;
  token: string;
};

const RESET_PASSWORD = {
  post: async (data: TRecoverPassword): Promise<any> => {
    return await axiosConfig.post(`${API_RESOURCE_AUTH}/reset-password`, data);
  },
};

export { RESET_PASSWORD };
