import { IPortfolio } from "@/@types/portfolio/IPortfolio";
import { PORTFOLIOS } from "@/services/apiService/endpoints/portfolio";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: Partial<IPortfolio>;
      id: string;
    }) => {
      const response = await PORTFOLIOS.update(data, id);
      return Promise.resolve(response);
    },
    onError: async (error: any) => {
      toast.error("Algo deu errado");
    },
    onSettled: () => queryClient.invalidateQueries(),
    onSuccess: () => {
      toast.success("Grupo atualizado com sucesso");
    },
  });
};

export default useUpdatePortfolio;
