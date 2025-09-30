import { TPolicies } from "@/@types/auth/IPolicies";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { POLICIES } from "../../../../services/apiService/endpoints/admin/policies";

function useGetMePolicies() {
  const pathname = usePathname();
  const authPages = [
    "/entrar",
    "/registrar",
    "/esqueci-senha",
    "/dois-fatores",
  ];
  const { getList } = POLICIES;
  return useQuery({
    enabled: !authPages.includes(pathname),
    queryFn: async (): Promise<TPolicies[]> => {
      const requests = await getList("/me");
      return requests;
    },
    queryKey: ["admin", "policies", "me"], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetMePolicies };
