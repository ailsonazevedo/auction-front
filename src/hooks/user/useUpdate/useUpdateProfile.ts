import { IUpdateProfile } from "@/@types/user/IProfile";
import { PROFILES } from "@/services/apiService/endpoints/auth/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateProfile = (invalidateQuery: string[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: Partial<IUpdateProfile>;
      id: string;
    }) => {
      const response = await PROFILES.patch(data, id);
      return Promise.resolve(response);
    },
    onError: async (error: any) => {
      toast.error("Algo deu errado");
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: invalidateQuery }),
    onSuccess: () => {
      toast.success("Usuário atualizado com sucesso");
    },
  });
};

export default useUpdateProfile;
