import { API_RESOURCE_AUTH } from "@/constants/services";
import { apiMethods } from "@/services/@shared/api.interface";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

import { CUSTOM_GROUP_PATCH } from "./custom";

// Exemplo de uso com todos os métodos do CRUD.
const GROUPS = apiMethods(axiosConfig, `${API_RESOURCE_AUTH}/iam/groups`);

export { CUSTOM_GROUP_PATCH, GROUPS };
