import { Axios } from "axios";

const ERROR_MESSAGE = "Error occurred while fetching data";

/**
 * Envia uma requisição GET para a URL especificada com opções opcionais.
 *
 * @param axiosInstance
 * @param {string} path - A URL para onde a requisição GET será enviada.
 * @returns {Promise<T>} - Uma promessa que resolve os dados da resposta.
 */
export async function get<T>(axiosInstance: Axios, path: string): Promise<T> {
  try {
    const response = await axiosInstance.get<T>(path);
    return response.data;
  } catch (error: unknown) {
    handleAxiosError(error);
  }
}

function handleAxiosError(error: unknown): never {
  throw error;
}
