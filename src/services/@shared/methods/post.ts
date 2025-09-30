import { IResponseError } from "@/@types/erro/IResponseError";
import { Axios } from "axios";

/**
 * Realiza uma requisição HTTP POST para a URL especificada com os dados fornecidos.
 *
 * @param {Axios} axiosInstance - A instância do Axios para enviar a requisição POST.
 * @param {string} url - A URL para enviar a requisição POST.
 * @param {*} payload - Os dados para enviar no corpo da requisição POST.
 * @returns {Promise<T>} - Uma promessa que resolve com os dados da resposta do servidor.
 */
export async function post<T>(
  axiosInstance: Axios,
  url: string,
  payload: unknown,
): Promise<T> {
  try {
    const response = await axiosInstance.post<T>(url, payload);
    return response.data;
  } catch (error: any) {
    throw handleError(error);
  }
}

/**
 * Manipula erros de requisição HTTP, extraindo a mensagem de erro apropriada.
 *
 * @param {any} error - O erro lançado pela requisição HTTP.
 * @returns {Error | IResponseError} - A mensagem de erro processada.
 */
function handleError(error: any): Error | IResponseError {
  if (error.response) {
    return error.response.data || "Erro desconhecido do servidor";
  } else if (error.request) {
    return {
      error: "Network Error",
      message: [
        {
          context: "Network Error",
          error: "Network Error",
          message: "Erro ao tentar se conectar ao servidor",
          statusCode: 500,
        },
      ],
      statusCode: 500,
    };
  } else {
    return new Error(error.message || "Erro desconhecido");
  }
}
