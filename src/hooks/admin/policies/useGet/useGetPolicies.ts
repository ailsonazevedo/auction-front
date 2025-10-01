import { IPermission } from "@/@types/auth/IPermission";
import { PERMISSIONS } from "@/services/apiService/endpoints/admin/permissions";
import { useQuery } from "@tanstack/react-query";

function useGetPolicies() {
  const { getList } = PERMISSIONS;
  return useQuery({
    queryFn: async (): Promise<IPermission[]> => {
      const requests = await getList();
      return requests;
    },
    queryKey: ["admin", "policies"], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetPolicies };
