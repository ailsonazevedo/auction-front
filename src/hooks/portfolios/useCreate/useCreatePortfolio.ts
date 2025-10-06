import { IPortfolio } from "@/@types/portfolio/IPortfolio";
import { PORTFOLIOS } from "@/services/apiService/endpoints/portfolio";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useCreatePortfolio(invalidateQuery: string[]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IPortfolio) => {
      const response = await PORTFOLIOS.create(data);
      return Promise.resolve(response);
    },
    onError: async (error: any) => {
      toast.error("Algo deu errado");
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: invalidateQuery }),
    onSuccess: () => {
      toast.success("Portfolio criado com sucesso");
    },
  });
}

export { useCreatePortfolio };
