import { IProfile } from "@/@types/user/IProfile";
import { getLoggedUserId } from "@/actions/get-logged-user-id";
import { PROFILES } from "@/services/apiService/endpoints/auth/users";
import { useQuery } from "@tanstack/react-query";

function useGetInfoLoggedUser() {
  const { getOne } = PROFILES;

  return useQuery({
    queryFn: async (): Promise<IProfile> => {
      const userId = await getLoggedUserId();
      return await getOne(userId);
    },
    queryKey: ["profile", "logged"],
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetInfoLoggedUser };
