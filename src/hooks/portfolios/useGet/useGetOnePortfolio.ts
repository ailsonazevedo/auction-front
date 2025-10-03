import { IPortfolio } from "@/@types/portfolio/IPortfolio";
import { PORTFOLIOS } from "@/services/apiService/endpoints/portfolio";
import { useQuery } from "@tanstack/react-query";

function useGetOnePortfolio(id: string) {
  const { getOne } = PORTFOLIOS;

  return useQuery({
    enabled: !!id && id !== "",
    queryFn: async (): Promise<IPortfolio> => {
      const requests = await getOne(id);
      return requests;
    },
    queryKey: ["portfolio", id], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetOnePortfolio };
