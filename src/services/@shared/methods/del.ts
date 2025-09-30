import { Axios } from "axios";

import { handleAxiosError } from "./patch";

/**
 * Faz uma requisição DELETE para a URL especificada com os dados fornecidos.
 *
 * @returns {Promise<T>} Uma promessa que resolve com os dados da resposta da requisição DELETE.
 * @param axiosInstance
 * @param path
 * @param config
 */
export async function del<T>(
  axiosInstance: Axios,
  path: string,
  params?: { data: T },
): Promise<T> {
  try {
    const response = await axiosInstance.delete<T>(path, params);
    return response.data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}
