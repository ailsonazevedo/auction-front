import { API_RESOURCE_AUTH } from "@/constants/services";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

// Criando métodos personalizados
const VALIDATE_QRCODE = {
  create: async (data: string): Promise<any> => {
    const formData = { token: data };
    return await axiosConfig.post(
      `${API_RESOURCE_AUTH}/iam/users/2FA/validate`,
      formData,
    );
  },
};

export { VALIDATE_QRCODE };
