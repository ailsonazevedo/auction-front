import { IPolicies } from "@/@types/auth/IPolicies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { POLICIES } from "../../../../services/apiService/endpoints/admin/policies";

function useCreatePolicies(invalidateQuery: string[]) {
  const { create } = POLICIES;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IPolicies) => {
      const resp = await create(data);
      return Promise.resolve(resp);
    },
    // Manipulação em caso de erro
    onError: async (error: any) => {
      toast.error(`${error}`);
    },
    onMutate: async () => {
      toast.loading("Salvando...", { id: "loadingCreateUser" });
    },
    // Manipulação independente de sucesso ou erro
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: invalidateQuery });
      toast.dismiss("loadingCreateUser");
    }, // Invalida a query chamada !!! IMPORTANTE
    // Manipulação em caso de sucesso
    onSuccess: () => {
      toast.success("Politica criada com sucesso");
    },
  });
}

export { useCreatePolicies };
