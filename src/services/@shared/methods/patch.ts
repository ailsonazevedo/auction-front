import { Axios, AxiosError } from "axios";

export function handleAxiosError(error: AxiosError): never {
  // Se não houver `response`, lançamos a mensagem de erro diretamente (como "Network Error")
  if (!error?.response) {
    throw new Error(error?.message);
  }

  // Se houver `response`, lançamos os dados da resposta
  throw error?.response?.data;
  //adicionei os '?' pq se o back n retornase mensage quebrava
}

/**
 * Envia uma requisição PATCH para a URL especificada com os dados fornecidos.
 *
 * @param {Axios} axiosInstance - A instância do Axios para enviar a requisição.
 * @param {string} path - O caminho para enviar a requisição PATCH.
 * @param {unknown} payload - Os dados a serem enviados no corpo da requisição.
 * @returns {Promise<T>} Uma promessa que resolve para os dados da resposta da requisição PATCH.
 */
export async function patch<T>(
  axiosInstance: Axios,
  path: string,
  payload?: unknown,
): Promise<T> {
  try {
    const response = await axiosInstance.patch<T>(path, payload);
    return response.data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}
