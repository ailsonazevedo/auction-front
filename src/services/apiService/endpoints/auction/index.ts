import { API_URL_BASE } from "@/constants/services";
import { apiMethods } from "@/services/@shared/api.interface";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

const AUCTIONS = apiMethods(axiosConfig, `${API_URL_BASE}/auction`);

export { AUCTIONS };
