import { apiMethods } from "@/services/@shared/api.interface";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

const PERMISSIONS = apiMethods(axiosConfig, `profiles/permissions`);

export { PERMISSIONS };
