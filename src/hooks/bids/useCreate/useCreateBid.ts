import { IBid } from "@/@types/bid/IBid";
import { BID } from "@/services/apiService/endpoints/bid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useCreateBid() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IBid) => {
      const response = await BID.create(data);
      return Promise.resolve(response);
    },
    onError: async (error: any) => {
      toast.error("Algo deu errado");
    },
    onSettled: () => queryClient.invalidateQueries(),
    onSuccess: () => {
      toast.success("Lance criado com sucesso");
    },
  });
}

export { useCreateBid };
