import { IAuction } from "@/@types/auction/IAuction";
import { AUCTIONS } from "@/services/apiService/endpoints/auction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateAuction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: Partial<IAuction>;
      id: string;
    }) => {
      const response = await AUCTIONS.update(data, id);
      return Promise.resolve(response);
    },
    onError: async (error: any) => {
      toast.error("Algo deu errado");
    },
    onSettled: () => queryClient.invalidateQueries(),
    onSuccess: () => {
      toast.success("Leilão atualizado com sucesso");
    },
  });
};

export default useUpdateAuction;
