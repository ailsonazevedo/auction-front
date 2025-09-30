import { IUpdateUser } from "@/@types/user/IUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { USERS } from "../../../services/apiService/endpoints/admin/users";

type TMutationFn = {
  data: Partial<IUpdateUser>;
  id: string;
};

function useUpdateUser(invalidateQuery: string[]) {
  const { updatePut } = USERS;

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: TMutationFn) => {
      const updatedData = await updatePut(data, id);
      return Promise.resolve(updatedData);
    },
    // Manipulação em caso de erro
    onError: async (error: AxiosError) => {
      switch (error.response?.status) {
        case 403:
          toast.error("Sem permissão para acessar este recurso.", {
            id: "userGenericError",
          });
          break;
        case 500:
          toast.error("Erro ao conectar ao servidor. Tente novamente", {
            id: "userGenericError",
          });
          break;
        default:
          toast.error("Erro ao atualizar usuário.", {
            id: "userGenericError",
          });
          break;
      }
    },
    // Manipulação independente de sucesso ou erro
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: invalidateQuery }),
    // Manipulação em caso de sucesso
    onSuccess: () => {
      toast.success("Usuário atualizado com sucesso");
    },
  });
}

export { useUpdateUser };
