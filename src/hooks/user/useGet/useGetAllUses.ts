import { IUser } from "@/@types/user/IUser";
import { useQuery } from "@tanstack/react-query";

import { USERS } from "../../../services/apiService/endpoints/admin/users";

function useGetAllUsers() {
  const { getList } = USERS;
  return useQuery({
    queryFn: async (): Promise<IUser[]> => {
      const requests = await getList();
      return requests;
    },
    queryKey: ["admin", "users"], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetAllUsers };
