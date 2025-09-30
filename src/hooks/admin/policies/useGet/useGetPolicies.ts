import { TPolicies } from "@/@types/auth/IPolicies";
import { useQuery } from "@tanstack/react-query";

import { POLICIES } from "../../../../services/apiService/endpoints/admin/policies";

function useGetPolicies() {
  const { getList } = POLICIES;
  return useQuery({
    queryFn: async (): Promise<TPolicies[]> => {
      const requests = await getList();
      return requests;
    },
    queryKey: ["admin", "policies"], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetPolicies };
