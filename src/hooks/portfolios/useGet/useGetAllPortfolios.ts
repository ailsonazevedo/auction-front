import { IPagination } from "@/@types/IPagination";
import { IResponse } from "@/@types/IResponse";
import { IPortfolio } from "@/@types/portfolio/IPortfolio";
import { PORTFOLIOS } from "@/services/apiService/endpoints/portfolio";
import { useQuery } from "@tanstack/react-query";

function useGetAllPortfolios(pagination?: IPagination) {
  const { getList } = PORTFOLIOS;

  const paginationFilter = pagination
    ? `&page=${pagination.page}&page_size=${pagination.page_size}`
    : "";

  const urlFilter = `?${paginationFilter}`;

  return useQuery({
    queryFn: async (): Promise<IResponse<IPortfolio>> => {
      const requests = await getList(urlFilter);
      return requests;
    },
    queryKey: ["portfolios", pagination],
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetAllPortfolios };
