import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ORGANIZATIONS } from "../../../../services/apiService/endpoints/admin/organizations";

function useDeleteOrganization(invalidateQuery: string[]) {
  const { deleteOne } = ORGANIZATIONS;
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
      toast.success("Organização deletada com sucesso");
    },
  });
}

export { useDeleteOrganization };
