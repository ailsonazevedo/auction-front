import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { USERS } from "../../../services/apiService/endpoints/admin/users";

function useDeleteUser(invalidateQuery: string[]) {
  const { deleteOne } = USERS;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = deleteOne(id);
      return Promise.resolve(data);
    },
    onError: async (error: any) => {
      toast.error("Algo deu errado");
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: invalidateQuery }),
    onSuccess: () => {
      toast.success("Usuário deletado com sucesso");
    },
  });
}

export { useDeleteUser };
