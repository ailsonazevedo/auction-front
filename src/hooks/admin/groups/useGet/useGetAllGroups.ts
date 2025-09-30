import { IGroup } from "@/@types/admin/groups/IGroup";
import { useQuery } from "@tanstack/react-query";

import { GROUPS } from "../../../../services/apiService/endpoints/admin/groups";

function useGetAllGroups() {
  const { getList } = GROUPS;

  return useQuery({
    queryFn: async (): Promise<IGroup[]> => {
      const requests = await getList();
      return requests;
    },
    queryKey: ["admin", "groups"], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetAllGroups };
