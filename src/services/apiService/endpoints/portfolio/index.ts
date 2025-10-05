import { API_URL_BASE } from "@/constants/services";
import { apiMethods } from "@/services/@shared/api.interface";
import { axiosConfig } from "@/services/apiService/axiosConfig/client";
import { axiosUpload } from "@/services/apiService/axiosConfig/upload";

const PORTFOLIOS = apiMethods(axiosConfig, `${API_URL_BASE}/portfolio`);

const UPLOAD_PORTFOLIOS = {
  upload: async (file: FormData): Promise<any> => {
    return await axiosUpload.post(`${API_URL_BASE}/portfolio/upload`, file);
  },
};

export { PORTFOLIOS, UPLOAD_PORTFOLIOS };
