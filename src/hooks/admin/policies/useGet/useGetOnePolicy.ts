import { TPolicies } from "@/@types/auth/IPolicies";
import { useQuery } from "@tanstack/react-query";

import { POLICIES } from "../../../../services/apiService/endpoints/admin/policies";

function useGetOnePolicy(id: string) {
  const { getOne } = POLICIES;

  return useQuery({
    enabled: !!id, // Habilita a chamada de query quando o id for informado

    queryFn: async (): Promise<TPolicies> => {
      const requests = await getOne(id);
      return requests;
    },
    queryKey: ["admin", "policies", id], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetOnePolicy };
