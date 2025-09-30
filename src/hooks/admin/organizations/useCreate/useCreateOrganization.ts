import { IOrganization } from "@/@types/admin/organizations/IOrganization";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ORGANIZATIONS } from "../../../../services/apiService/endpoints/admin/organizations";

function useCreateOrganization(invalidateQuery: string[]) {
  const { create } = ORGANIZATIONS;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IOrganization) => {
      const resp = await create(data);
      return Promise.resolve(resp);
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
      toast.success("Organização criada com sucesso");
    },
  });
}

export { useCreateOrganization };
