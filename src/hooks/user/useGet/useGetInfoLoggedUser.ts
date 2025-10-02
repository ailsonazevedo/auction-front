import { IProfile } from "@/@types/user/IProfile";
import { getLoggedUserId } from "@/actions/get-logged-user-id";
import { PROFILES } from "@/services/apiService/endpoints/admin/users";
import { useQuery } from "@tanstack/react-query";

function useGetInfoLoggedUser() {
  const { getOne } = PROFILES;

  return useQuery({
    queryFn: async (): Promise<IProfile> => {
      const userId = await getLoggedUserId();
      return await getOne(userId);
    },
    queryKey: ["admin", "users", "logged"], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetInfoLoggedUser };
