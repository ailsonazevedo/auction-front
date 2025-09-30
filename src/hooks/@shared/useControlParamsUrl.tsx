import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
type ReplaceFunction = (url: string) => void;

/**
 * Hook para gerenciar parâmetros de URL usando `URLSearchParams` e funções de atualização de URL.
 *
 * @param {URLSearchParams} searchParams - Os parâmetros de busca atuais da URL.
 * @param {ReplaceFunction} replace - Função para substituir a URL no navegador.
 * @param {string} pathname - O caminho base da URL.
 * @returns {Object} - Métodos para manipular os parâmetros da URL.
 */
export const useControlParamsUrl = (
  sea?: URLSearchParams,
  rep?: ReplaceFunction,
  path?: string,
) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  /**
   * Atualiza a URL com os parâmetros de consulta atuais.
   */
  const updateUrl = useCallback(() => {
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    replace(newUrl);
  }, [params, pathname, replace]);

  /**
   * Obtém todos os parâmetros de URL como um objeto.
   * @returns {Record<string, string>} - Objeto contendo todos os parâmetros de URL.
   */
  const getAll = useCallback(() => {
    const paramsObj: Record<string, string> = {};
    params.forEach((value, key) => {
      paramsObj[key] = value;
    });
    return paramsObj;
  }, [params]);

  /**
   * Obtém o valor de um parâmetro de URL específico.
   * @param {string} name - Nome do parâmetro de URL.
   * @returns {string | null} - O valor do parâmetro ou null se não estiver presente.
   */
  const getOne = useCallback(
    (name: string) => params.get(name),
    [searchParams],
  );

  /**
   * Define ou remove um parâmetro de URL.
   * @param {string} name - Nome do parâmetro.
   * @param {string | undefined} value - Valor do parâmetro. Se undefined, o parâmetro é removido.
   */
  const setParam = useCallback(
    (name: string, value: string | undefined) => {
      if (value !== undefined) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      updateUrl();
    },
    [params, updateUrl],
  );

  /**
   * Converte um objeto JSON em parâmetros de URL e os aplica.
   * @param {Record<string, any>} jsonPayload - Objeto contendo chaves e valores a serem definidos como parâmetros.
   */
  const jsonToParams = useCallback(
    (jsonPayload: Record<string, any>) => {
      Object.entries(jsonPayload).forEach(([key, value]) => {
        setParam(key, String(value));
      });
    },
    [setParam],
  );

  /**
   * Remove um parâmetro específico da URL.
   * @param {string} name - Nome do parâmetro a ser removido.
   */
  const remove = useCallback(
    (name: string) => {
      if (params.has(name)) {
        params.delete(name);
        updateUrl();
      }
    },
    [params, updateUrl],
  );

  return { getAll, getOne, jsonToParams, remove, setParam };
};
