import { API_RESOURCE_AUTH } from "@/constants/services";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

export type TChangePassword = {
  newPassword: string;
  oldPassword: string;
};
// Criando métodos personalizados
const changePassword = {
  update: async (data: TChangePassword): Promise<any> => {
    return await axiosConfig.put(`${API_RESOURCE_AUTH}/password`, data);
  },
};

export { changePassword };
