import { IPolicies } from "@/@types/auth/IPolicies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { POLICIES } from "../../../../services/apiService/endpoints/admin/policies";

type TMutationFn = {
  data: Partial<IPolicies>;
  id: string;
};

function useUpdatePolicy(invalidateQuery: string[]) {
  const { update } = POLICIES;

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: TMutationFn) => {
      const updatedData = await update(data, id);
      return Promise.resolve(updatedData);
    },
    // Manipulação em caso de erro
    onError: async (error: any) => {
      toast.error(`${error}`);
    },
    onMutate: async () => {
      toast.loading("Salvando...", { id: "loadingUpdateUser" });
    },
    // Manipulação independente de sucesso ou erro
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: invalidateQuery });
      toast.dismiss("loadingUpdateUser");
    },
    // Manipulação em caso de sucesso
    onSuccess: () => {
      toast.success("Atualização efetuada com sucesso");
    },
  });
}

export { useUpdatePolicy };
