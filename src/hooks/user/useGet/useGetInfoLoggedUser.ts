import { IUser } from "@/@types/user/IUser";
import { getLoggedUserId } from "@/actions/get-logged-user-id";
import { useQuery } from "@tanstack/react-query";

import { USERS } from "../../../services/apiService/endpoints/admin/users";

function useGetInfoLoggedUser() {
  const { getOne } = USERS;

  return useQuery({
    queryFn: async (): Promise<IUser> => {
      const userId = await getLoggedUserId();
      return await getOne(userId);
    },
    queryKey: ["admin", "users", "logged"], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetInfoLoggedUser };
