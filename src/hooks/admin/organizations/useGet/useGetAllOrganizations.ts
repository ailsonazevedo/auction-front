import { IOrganization } from "@/@types/admin/organizations/IOrganization";
import { useQuery } from "@tanstack/react-query";

import { ORGANIZATIONS } from "../../../../services/apiService/endpoints/admin/organizations";

function useGetAllOrganizations() {
  const { getList } = ORGANIZATIONS;

  return useQuery({
    queryFn: async (): Promise<IOrganization[]> => {
      const requests = await getList();
      return requests;
    },
    queryKey: ["admin", "organizations"], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetAllOrganizations };
