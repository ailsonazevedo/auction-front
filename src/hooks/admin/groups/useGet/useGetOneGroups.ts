import { IGroup } from "@/@types/admin/groups/IGroup";
import { useQuery } from "@tanstack/react-query";

import { GROUPS } from "../../../../services/apiService/endpoints/admin/groups";

function useGetOneGroups(id: string) {
  const { getOne } = GROUPS;

  return useQuery({
    enabled: !!id && id !== "",
    queryFn: async (): Promise<IGroup> => {
      const requests = await getOne(id);
      return requests;
    },
    queryKey: ["admin", "groups", id], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetOneGroups };
