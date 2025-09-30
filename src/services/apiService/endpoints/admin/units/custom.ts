import { IUnit } from "@/@types/admin/unit/IUnit";
import { API_RESOURCE_AUTH } from "@/constants/services";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

const CUSTOM_UNIT = {
  update: async (id: string, data: IUnit): Promise<any> => {
    return await axiosConfig.put(`${API_RESOURCE_AUTH}/iam/units/${id}`, data);
  },
};

export { CUSTOM_UNIT };
