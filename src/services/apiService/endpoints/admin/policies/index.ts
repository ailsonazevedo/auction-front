import { API_RESOURCE_AUTH } from "@/constants/services";
import { apiMethods } from "@/services/@shared/api.interface";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

// Exemplo de uso com todos os métodos do CRUD.
const POLICIES = apiMethods(axiosConfig, `${API_RESOURCE_AUTH}/iam/policies`);

export { POLICIES };
