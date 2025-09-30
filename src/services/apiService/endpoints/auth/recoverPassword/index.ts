import { API_RESOURCE_AUTH } from "@/constants/services";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

export type TRecoverPassword = {
  email: string;
};

const RECOVER_PASSWORD = {
  post: async (data: TRecoverPassword): Promise<any> => {
    return await axiosConfig.post(
      `${API_RESOURCE_AUTH}/recover-password`,
      data,
    );
  },
};

export { RECOVER_PASSWORD };
