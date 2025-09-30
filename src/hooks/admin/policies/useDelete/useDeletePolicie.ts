import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { POLICIES } from "../../../../services/apiService/endpoints/admin/policies";

function useDeletePolicy(invalidateQuery: string[]) {
  const { deleteOne } = POLICIES;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = deleteOne(id);
      return Promise.resolve(data);
    },
    // Manipulação em caso de erro
    onError: async (error: any) => {
      toast.error(`${error}`);
    },
    onMutate: async () => {
      toast.loading("Excluindo...", { id: "loadingDeletePolicy" });
    },
    // Manipulação independente de sucesso ou erro
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: invalidateQuery });
      toast.dismiss("loadingDeletePolicy");
    }, // Invalida a query chamada !!! IMPORTANTE
    // Manipulação em caso de sucesso
    onSuccess: () => {
      toast.success("Politica excluída com sucesso");
    },
  });
}

export { useDeletePolicy };
