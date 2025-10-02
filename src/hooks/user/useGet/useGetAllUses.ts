import { IProfile } from "@/@types/user/IProfile";
import { useQuery } from "@tanstack/react-query";

import { PROFILES } from "../../../services/apiService/endpoints/admin/users";

function useGetAllUsers() {
  const { getList } = PROFILES;
  return useQuery({
    queryFn: async (): Promise<IProfile[]> => {
      const requests = await getList();
      return requests;
    },
    queryKey: ["admin", "users"], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetAllUsers };
