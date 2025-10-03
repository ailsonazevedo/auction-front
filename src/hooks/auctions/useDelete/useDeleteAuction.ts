import { AUCTIONS } from "@/services/apiService/endpoints/auction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteAuction(invalidate: string[] = ["auctions"]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await AUCTIONS.deleteOne(id);
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

export { useDeleteAuction };
