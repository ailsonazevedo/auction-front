import { IOrganization } from "@/@types/admin/organizations/IOrganization";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ORGANIZATIONS } from "../../../../services/apiService/endpoints/admin/organizations";

type TMutationFn = {
  data: Partial<IOrganization>;
  id: string;
};

function useUpdateOrganization(invalidateQuery: string[]) {
  const { update } = ORGANIZATIONS;

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: TMutationFn) => {
      const updatedData = await update(data, id);
      return Promise.resolve(updatedData);
    },
    // Manipulação em caso de erro
    onError: async (error: any) => {
      toast.error("Algo deu errado");
    },
    // Manipulação independente de sucesso ou erro
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: invalidateQuery }),
    // Manipulação em caso de sucesso
    onSuccess: () => {
      toast.success("Organização atualizada com sucesso");
    },
  });
}

export { useUpdateOrganization };
