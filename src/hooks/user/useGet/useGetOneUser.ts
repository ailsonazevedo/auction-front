import { IUser } from "@/@types/user/IUser";
import { useQuery } from "@tanstack/react-query";

import { PROFILES } from "../../../services/apiService/endpoints/admin/users";

function useGetOneUser(id: string) {
  const { getOne } = PROFILES;

  return useQuery({
    enabled: !!id,
    queryFn: async (): Promise<IUser> => {
      return await getOne(id);
    },
    queryKey: ["admin", "users", id], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetOneUser };
