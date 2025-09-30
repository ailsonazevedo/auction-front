import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { GROUPS } from "../../../../services/apiService/endpoints/admin/groups";

function useDeleteGroup(invalidateQuery: string[]) {
  const { deleteOne } = GROUPS;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = deleteOne(id);
      return Promise.resolve(data);
    },
    // Manipulação em caso de erro
    onError: async (error: any) => {
      toast.error("Algo deu errado");
    },
    // Manipulação independente de sucesso ou erro
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: invalidateQuery }), // Invalida a query chamada !!! IMPORTANTE
    // Manipulação em caso de sucesso
    onSuccess: () => {
      toast.success("Excluido com sucesso");
    },
  });
}

export { useDeleteGroup };
