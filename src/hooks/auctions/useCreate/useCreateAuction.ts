import { IPortfolio } from "@/@types/portfolio/IPortfolio";
import { AUCTIONS } from "@/services/apiService/endpoints/auction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useCreateAuction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IPortfolio) => {
      const response = await AUCTIONS.create(data);
      return Promise.resolve(response);
    },
    onError: async (error: any) => {
      toast.error("Algo deu errado");
    },
    onSettled: () => queryClient.invalidateQueries(),
    onSuccess: () => {
      toast.success("Leilão criado com sucesso");
    },
  });
}

export { useCreateAuction };
