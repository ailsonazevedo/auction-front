import { API_URL_BASE } from "@/constants/services";
import { apiMethods } from "@/services/@shared/api.interface";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

const STORES = apiMethods(axiosConfig, `${API_URL_BASE}/stores`);

export { STORES };
