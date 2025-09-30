import { IEnderecoResponse } from "@/@types/viaCep/IEndereco";
import { ws } from "@/services/apiViaCep/endpoints/ws";
import { useQuery } from "@tanstack/react-query";

function useGetEndereco(cep: string, check: boolean) {
  const { getOne } = ws;
  const cepData = cep.replace("-", "");
  return useQuery({
    enabled: cep?.length === 9 && check,
    gcTime: 0,
    //TODO: Definir tipagem do retorno
    queryFn: async (): Promise<IEnderecoResponse> => {
      return await getOne(cep);
    },
    queryKey: ["viacep", "ws", cep], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
    select: (data) => {
      return data.data;
    },
    staleTime: 0,
  });
}

export { useGetEndereco };
