import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { GROUPS } from "../../../../services/apiService/endpoints/admin/groups";

function useCreateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await GROUPS.create(data);
      return Promise.resolve(response);
    },
    onError: async (error: any) => {
      toast.error("Algo deu errado");
    },
    onSettled: () => queryClient.invalidateQueries(),
    onSuccess: () => {
      toast.success("Grupo criado com sucesso");
    },
  });
}

export { useCreateGroup };
