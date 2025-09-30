import { IOrganization } from "@/@types/admin/organizations/IOrganization";
import { useQuery } from "@tanstack/react-query";

import { ORGANIZATIONS } from "../../../../services/apiService/endpoints/admin/organizations";

function useGetOneOrganization(id: string) {
  const { getOne } = ORGANIZATIONS;

  return useQuery({
    enabled: !!id && id !== "",

    queryFn: async (): Promise<IOrganization> => {
      return await getOne(id);
    },
    queryKey: ["admin", "organizations", id], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetOneOrganization };
