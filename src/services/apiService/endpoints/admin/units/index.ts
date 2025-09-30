import { API_RESOURCE_AUTH } from "@/constants/services";
import { apiMethods } from "@/services/@shared/api.interface";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";

import { CUSTOM_UNIT } from "./custom";

const UNITS = apiMethods(axiosConfig, `${API_RESOURCE_AUTH}/iam/units`);

export { CUSTOM_UNIT, UNITS };
