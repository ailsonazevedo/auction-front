import { TCreateAuction } from "@/@types/auction/IAuction";
import { AUCTIONS } from "@/services/apiService/endpoints/auction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useCreateAuction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TCreateAuction) => {
      const response = await AUCTIONS.create(data);
      return Promise.resolve(response);
    },
    onError: async () => {
      toast.error("Algo deu errado");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["auctions"] }),
    onSuccess: () => {
      toast.success("Leilão criado com sucesso");
    },
  });
}

export { useCreateAuction };
