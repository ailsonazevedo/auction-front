import { API_RESOURCE_AUTH } from "@/constants/services";
import { get } from "@/services/@shared/methods/get";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

// Este método implementa apenas o getOne CUSTOMIZADO
const terminalLog = {
  getList: async (params?: string): Promise<any> => {
    return await get(axiosConfig, `${API_RESOURCE_AUTH}/teste_log`);
  },
  getOne: async (id: string, params?: string): Promise<any> => {
    if (params) {
      return await get(axiosConfig, `${API_RESOURCE_AUTH}/${id}/teste_log`);
    } else {
      return await get(axiosConfig, `${API_RESOURCE_AUTH}/ws/${id}/teste_log`);
    }
  },
};

export { terminalLog };
