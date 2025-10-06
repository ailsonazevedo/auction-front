import { apiMethods } from "@/services/@shared/api.interface";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

const PROFILES = apiMethods(axiosConfig, `profiles`);

export { PROFILES };
