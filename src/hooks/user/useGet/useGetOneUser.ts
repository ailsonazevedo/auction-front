import { IProfile } from "@/@types/user/IProfile";
import { PROFILES } from "@/services/apiService/endpoints/auth/users";
import { useQuery } from "@tanstack/react-query";

function useGetOneUser(id: string) {
  const { getOne } = PROFILES;

  return useQuery({
    enabled: !!id,
    queryFn: async (): Promise<IProfile> => {
      return await getOne(id);
    },
    queryKey: ["profile", id],
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetOneUser };
