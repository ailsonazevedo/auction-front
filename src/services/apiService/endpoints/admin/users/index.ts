import { API_RESOURCE_AUTH } from "@/constants/services";
import { apiMethods } from "@/services/@shared/api.interface";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

// Exemplo de uso com todos os métodos do CRUD.
const USERS = apiMethods(axiosConfig, `${API_RESOURCE_AUTH}/iam/users`);

export { USERS };
