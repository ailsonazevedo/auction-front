import { IGroup } from "@/@types/admin/groups/IGroup";
import { API_RESOURCE_AUTH } from "@/constants/services";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

const CUSTOM_GROUP_PATCH = {
  update: async (id: string, data: Partial<IGroup>): Promise<IGroup> => {
    return await axiosConfig.put(`${API_RESOURCE_AUTH}/iam/groups/${id}`, data);
  },
};

export { CUSTOM_GROUP_PATCH };
