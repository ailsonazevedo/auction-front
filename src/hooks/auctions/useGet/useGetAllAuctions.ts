import { IPagination } from "@/@types/IPagination";
import { IResponse } from "@/@types/IResponse";
import { TAuction } from "@/@types/auction/IAuction";
import { AUCTIONS } from "@/services/apiService/endpoints/auction";
import { useQuery } from "@tanstack/react-query";

function useGetAllAuctions(pagination?: IPagination) {
  const { getList } = AUCTIONS;

  const paginationFilter = pagination
    ? `&page=${pagination.page}&page_size=${pagination.page_size}`
    : "";

  const urlFilter = `?${paginationFilter}`;

  return useQuery({
    queryFn: async (): Promise<IResponse<TAuction>> => {
      const requests = await getList(urlFilter);
      return requests;
    },
    queryKey: ["auctions", pagination],
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
}

export { useGetAllAuctions };
