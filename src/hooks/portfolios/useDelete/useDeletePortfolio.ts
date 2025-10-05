import { PORTFOLIOS } from "@/services/apiService/endpoints/portfolio";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeletePortfolio(invalidate: string[]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await PORTFOLIOS.deleteOne(id);
      return Promise.resolve(response);
    },
    onError: async () => {
      toast.error("Erro ao remover leilão");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: invalidate }),
    onSuccess: () => {
      toast.success("Leilão removido com sucesso");
    },
  });
}

export { useDeletePortfolio };
